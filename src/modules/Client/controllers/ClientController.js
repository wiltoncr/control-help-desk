class ClientController {

    constructor(clientRepo) {
        this.clientRepo = clientRepo
    }

    async getAllData() {
        try {
            return await this.clientRepo.getClient();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getAll(req, res) {
        const clients = await this.getAllData();
        return clients ? res.json({ clients }) : res.status(500).json({ error: 'Internal server error' });
    }

    async delete(req, res) {
        try {
            const { id } = req.body
            const idInt = parseInt(id)
            const client = await this.clientRepo.deleteClientById(idInt)
            return res.status(200).json({ client })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }

    async createClient(req, res) {
        try {
            const { type, server, client, desc } = req.body
            console.log(req.body);
            const payloadClient = {
                type: Number(type),
                server: Boolean(server),
                client: client,
                desc: desc
            };
            await this.clientRepo.save(payloadClient);
            return res.status(204).json("Client Created");
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }
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
    }
    async getClientByDesc(req, res) {
        try {
            const { desc } = req.query
            const client = await this.clientRepo.getClientByDesc(desc)
            return res.status(200).json({ client })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }
}

module.exports = { ClientController };