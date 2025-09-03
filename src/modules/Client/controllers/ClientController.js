class ClientController {
  constructor(clientRepo) {
    this.clientRepo = clientRepo;
  }

  async getAll(req, res) {
    try {
      const clients = await this.clientRepo.getClient(req.user.id);      
      return res.json({ clients });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

    async getByCompany(req, res) {
    try {
      const {
        companyId
      } = req.body;

      const clients = await this.clientRepo.getByCompany(req.user.id, companyId);      
      return res.json({ clients });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateClient(req, res) {
    try {
      const {
        id, name, cnpj, email
      } = req.body;

      if (!id || !name || !cnpj || !email ) {
        return res.status(400).json({
          error: 'id, name, cnpj and email is required.',
        });
      }

      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'id is not valid!' });
      }

      const payloadAccess = {
        id,
        name,
        cnpj,
        email
      };
      const response = await this.clientRepo.update(payloadAccess);
      return res.status(201).json({ clients: [response] });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'ID is not valid!' });
      }
      const client = await this.clientRepo.deleteClientById(Number(id));
      return res.status(200).json({ client });
    } catch (err) {
      console.log(err);
      return res.json({ error: 'Internal server error' });
    }
  }

  async createClient(req, res) {
    try {
      const { name, cnpj, email, companyId } = req.body;
      console.log(req.body);
      const payloadClient = { name, cnpj, email };
      const newClient = await this.clientRepo.save(payloadClient, companyId);
      return res.status(201).json({ client: newClient });
    } catch (err) {
      console.log(err);
      return res.json({ error: 'Internal server error' });
    }
  }

  async getClientById(req, res) {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: 'ID is not valid!' });
    }
    try {
      const client = await this.clientRepo.getClientById(Number(id));
      return res.status(200).json({ clients: [client] });
    } catch (err) {
      console.log(err);
      return res.json({ error: 'Internal server error' });
    }
  }

  async getClientByName(req, res) {
    try {
      const { name } = req.query;
      if (!name) {
        return res.status(400).json({ error: 'name is not valid or empty' });
      }
      const client = await this.clientRepo.getClientByName(name);
      return res.status(200).json({ client });
    } catch (err) {
      console.log(err);
      return res.json({ error: 'Internal server error' });
    }
  }

  async getClientByEmail(req, res) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: 'email is not valid or empty' });
      }
      const client = await this.clientRepo.getClientByName(email);
      return res.status(200).json({ client });
    } catch (err) {
      console.log(err);
      return res.json({ error: 'Internal server error' });
    }
  }
}

module.exports = { ClientController };
