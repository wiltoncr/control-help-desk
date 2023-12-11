const bcryptjs = require('bcryptjs');

class UserController {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async show(req, res) {
    try {
      return res.json(req.user);
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
      const user = await this.userRepo.deleteUserById(Number(id));
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createUser(req, res) {
    try {
      const {
        name, email, password, role = 'CLIENTE',
      } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          error: 'name, email and password is required.',
        });
      }

      const passwordHash = await bcryptjs.hash(password, 8);

      const user = {
        name,
        email,
        password: passwordHash,
        role,
      };

      const newUser = await this.userRepo.save(user);
      return res.status(201).json({ user: newUser });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'ID is not valid!' });
      }
      const user = await this.userRepo.getUserById(Number(id));
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserByName(req, res) {
    try {
      const { name } = req.query;
      if (!name) {
        return res.status(400).json({ error: 'name is not valid or empty' });
      }
      const user = await this.userRepo.getUserByName(name);

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserByEmail(req, res) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: 'email is not valid or empty' });
      }
      const user = await this.userRepo.getUserByEmail(email);
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = { UserController };
