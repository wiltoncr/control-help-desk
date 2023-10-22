class UserController {

    constructor(userRepo) {
        this.userRepo = userRepo
    }

    async getAll(req, res) {
        try {
            const users = await this.userRepo.getUsers();
            return res.json({ users });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        };
    };

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({ error: 'ID is not valid!' });
            };
            const user = await this.userRepo.deleteUserById(Number(id));
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createUser(req, res) {
        try {
            const { name, email, password, role = 'CLIENTE' } = req.body

            if (!name || !email || !password) {
                return res.status(400).json({
                    error: "name, email and password is required."
                });
            };

            const user = {
                name: name,
                email: email,
                password: password,
                role: role
            };

            const newUser = await this.userRepo.save(user);
            return res.status(201).json({ user: newUser });
        } catch (err) {
            if (err.code == 'P2002') {
                return res.status(400).json({ error: `error with  this fields ${err.meta.target[0]}` });
            };
            return res.status(500).json({ error: 'Internal server error' });
        };
    };

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({ error: 'ID is not valid!' });
            };
            const user = await this.userRepo.getUserById(Number(id));
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        };
    };

    async getUserByName(req, res) {
        try {
            const { name } = req.query
            const user = await this.userRepo.getUserByName(name)
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        };
    };

    async getUserByEmail(req, res) {
        try {
            const { email } = req.query
            const user = await this.userRepo.getUserByEmail(email)
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        };
    };
}

module.exports = { UserController };
