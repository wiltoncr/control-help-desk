class CompanyController {

    constructor(companyRepo) {
        this.companyRepo = companyRepo
    }

    async getAllData() {
        try {
            return await this.companyRepo.getCompany();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getAll(req, res) {

        const companys = await this.getAllData();

        return companys ? res.json({ companys }) : res.status(500).json({ error: 'Internal server error' });
    }

    async delete(req, res) {
        try {
            const { id } = req.body
            const idInt = parseInt(id)
            const company = await this.companyRepo.deleteCompanyById(idInt)
            return res.status(200).json({ company })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }

    async createCompany(req, res) {
        try {
            const { name, email, cnpj, role = 'CLIENTE' } = req.body

            const company = { name, email, cnpj, role };

            await this.companyRepo.save(company)
            return res.json({status: '200', msg: 'Company Created'});
        } catch (err) {
            console.log(err);
            return res.status(503).json({ error: 'Internal server error' });
        }
    }
    async getCompanyById(req, res) {
        try {
            const { id } = req.query
            const idInt = parseInt(id)
            const company = await this.companyRepo.getCompanyById(idInt)
            return res.status(200).json({ company })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }

    async getCompanyByName(req, res) {
        try {
            const { name } = req.query
            const company = await this.companyRepo.getCompanyByName(name)
            return res.status(200).json({ company })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }

    async getCompanyByEmail(req, res) {
        try {
            const { email } = req.query
            const company = await this.companyRepo.getCompanyByEmail(email)
            return res.status(200).json({ company })
        } catch (err) {
            console.log(err);
            return res.json({ error: 'Internal server error' });
        }
    }
}

module.exports = { CompanyController };
