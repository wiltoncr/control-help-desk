class AccessController {
  constructor(accessRepo) {
    this.accessRepo = accessRepo;
  }

  async getAll(req, res) {
    try {
      const access = await this.accessRepo.getAccess();
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
      const access = await this.accessRepo.deleteAccessById(Number(id));
      return res.status(200).json({ access });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createAccess(req, res) {
    try {
      const {
        type, server, access, desc,
      } = req.body;

      if (!type || !server || !access || !desc) {
        return res.status(400).json({
          error: 'type, server, access and desc is required.',
        });
      }

      if (!Number.isInteger(Number(type))) {
        return res.status(400).json({ error: 'type is not valid!' });
      }

      const payloadAccess = {
        type: Number(type),
        server: Boolean(server),
        access,
        desc,
      };
      const newAccess = await this.accessRepo.save(payloadAccess);
      return res.status(201).json({ access: newAccess });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAccessById(req, res) {
    try {
      const { id } = req.params;
      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'ID is not valid!' });
      }
      const access = await this.accessRepo.getAccessById(Number(id));
      return res.status(200).json({ access });
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
      const access = await this.accessRepo.getAccessByDesc(desc);
      return res.status(200).json({ access });
    } catch (err) {
      console.log(err);
      return res.json({ error: 'Internal server error' });
    }
  }
}

module.exports = { AccessController };
