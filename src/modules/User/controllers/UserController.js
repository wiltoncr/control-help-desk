class UserController {

    constructor(userRepo) {
        this.userRepo = userRepo
    }

    async getAllData() {
        try {
            return await this.userRepo.getUsers();;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getAll(req, res) {
        const users = await this.getAllData();
        return users ? res.json({ users }) : res.status(500).json({ error: 'Internal server error' });
    }

    async delete(req, res) {
        try {
            const { id } = req.body
            const idInt = parseInt(id)
            const user = await this.userRepo.deleteUserById(idInt)
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }

    async createUser(req, res) {
        try {
            const { name, email, password, role = 'CLIENTE' } = req.body
            
            if(!name || !email || !password){
                return res.status(400).json({
                    error: "name, email and password is required."
                });
            };

            const user = {
                name: name,
                email: email,
                password: password,
                role: role
            }
            await this.userRepo.save(user)
            return res.status(201).json("User Created")
        } catch (err) {
            if(err.code =='P2002'){
                return  res.status(400).json({ error: `error with  this fields ${err.meta.target[0]}` });
            };
            return res.status(500).json({ error: 'Internal server error' });
        };
    };
    
    async getUserById(req, res) {
        try {
            const { id } = req.query
            const idInt = parseInt(id)
            const user = await this.userRepo.getUserById(idInt)
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }

    async getUserByName(req, res) {
        try {
            const { name } = req.query
            const user = await this.userRepo.getUserByName(name)
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }

    async getUserByEmail(req, res) {
        try {
            const { email } = req.query
            const user = await this.userRepo.getUserByEmail(email)
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }
}

module.exports = { UserController };
