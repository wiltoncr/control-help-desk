class AccessController {

    constructor(accessRepo) {
        this.accessRepo = accessRepo
    }

    async getAllData() {
        try {
            return await this.accessRepo.getAccess();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getAll(req, res) {
        const access =  await this.getAllData();
        return access ? res.json({ access }) : res.status(500).json({ error: 'Internal server error' });
    }

    async delete(req, res) {
        try {
            const { id } = req.body
            const idInt = parseInt(id)
            const access = await this.accessRepo.deleteAccessById(idInt)
            return res.status(200).json({ access })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }

    async createAccess(req, res) {
        try {
            const { type, server, access, desc } = req.body

            const payloadAccess = {
                type: Number(type),
                server: Boolean(server),
                access: access,
                desc: desc
            };
            await this.accessRepo.save(payloadAccess);
            return res.status(204).json("Access Created");
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }
    async getAccessById(req, res) {
        try {
            const { id } = req.query
            const idInt = parseInt(id)
            const access = await this.accessRepo.getAccessById(idInt)
            return res.status(200).json({ access })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }
    async getAccessByDesc(req, res) {
        try {
            const { desc } = req.query
            const access = await this.accessRepo.getAccessByDesc(desc)
            return res.status(200).json({ access })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }
}

module.exports = { AccessController };