class AccessController {
  constructor(accessRepo) {
    this.accessRepo = accessRepo;
  }

  async getAll(req, res) {
    try {
      const access = await this.accessRepo.getAccess(req.user.id);
      return res.json({ access });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'ID is not valid!' });
      }
      const access = await this.accessRepo.deleteAccessById(Number(id), req.user.id);
      return res.status(200).json({ access });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createAccess(req, res) {
    try {
      const {
        type, server, access, desc, idClient
      } = req.body;

      if (!type || !access || !desc || !idClient) {
        return res.status(400).json({
          error: 'type, server, access and desc is required.',
        });
      }

      if (!Number.isInteger(Number(type))) {
        return res.status(400).json({ error: 'type is not valid!' });
      };

      if(typeof server !== 'boolean'){
        return res.status(400).json({ error: 'server is not valid!'});
      };

      const payloadAccess = {
        type: Number(type),
        server: Boolean(server),
        access,
        desc,
        idClient
      };
      const newAccess = await this.accessRepo.save(payloadAccess, req.user.id);
      return res.status(201).json({ access: newAccess });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateAccess(req, res) {
    try {
      const {
        id, type, server, access, desc, idClient
      } = req.body;

      if (!id || !type || !access || !desc || !idClient) {
        return res.status(400).json({
          error: 'type, access, idClient and desc is required.',
        });
      };

      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'id is not valid!' });
      };

      if (!Number.isInteger(Number(idClient))) {
        return res.status(400).json({ error: 'idClient is not valid!' });
      };

      if (!Number.isInteger(Number(type))) {
        return res.status(400).json({ error: 'type is not valid!' });
      };

      if (typeof server !== 'boolean') {
        return res.status(400).json({ error: 'Boolean value is not valid!' });
      };

      const payloadAccess = {
        id,
        type: Number(type),
        server: Boolean(server),
        access,
        desc,
        idClient
      };
      const response = await this.accessRepo.update(payloadAccess, req.user.id);
      return res.status(201).json({ access: response });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    };
  };

  async getAccessById(req, res) {
    try {
      const { id } = req.params;
      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'ID is not valid!' });
      }
      const access = await this.accessRepo.getAccessById(Number(id), req.user.id);
      return res.status(200).json({ access: [access]});
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAccessByDesc(req, res) {
    try {
      const { desc } = req.query;
      if (!desc) {
        return res.status(400).json({ error: 'desc is empty!' });
      }
      const access = await this.accessRepo.getAccessByDesc(desc, req.user.id);
      return res.status(200).json({ access });
    } catch (err) {
      console.log(err);
      return res.json({ error: 'Internal server error' });
    }
  }
}

module.exports = { AccessController };
