class ClientController {

    constructor(clientRepo) {
        this.clientRepo = clientRepo
    };
    async getAll(req, res) {
        try {
            const clients = await this.clientRepo.getClient();
            return res.json({ clients });
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
            const client = await this.clientRepo.deleteClientById(Number(id));
            return res.status(200).json({ client })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    };
    async createClient(req, res) {
        try {
            const { name, cnpj, email } = req.body
            console.log(req.body);
            const payloadClient = { name, cnpj, email };
            const newClient = await this.clientRepo.save(payloadClient);
            return res.status(201).json({client: newClient});
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    };
    async getClientById(req, res) {
        try {
            const { id } = req.query
            const idInt = parseInt(id)
            const client = await this.clientRepo.getClientById(idInt)
            return res.status(200).json({ client })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    };
    async getClientByName(req, res) {
        try {
            const { name } = req.query;
            if (!name) {
                return res.status(400).json({ error: 'name is not valid or empty' });
            };
            const client = await this.clientRepo.getClientByName(name)
            return res.status(200).json({ client })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        };
    };
    async getClientByEmail(req, res) {
        try {
            const { email } = req.query;
            if (!email) {
                return res.status(400).json({ error: 'email is not valid or empty' });
            };
            const client = await this.clientRepo.getClientByName(email);
            return res.status(200).json({ client });
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        };
    };
};

module.exports = { ClientController };