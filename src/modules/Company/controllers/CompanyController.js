class CompanyController {

    constructor(companyRepo) {
        this.companyRepo = companyRepo
    };

    async getAll(req, res) {
        try {
            const companys = await this.companyRepo.getCompany();
            return res.json({ companys });
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
            const company = await this.companyRepo.deleteCompanyById(Number(id));
            return res.status(200).json({ company });
        } catch (err) {
            console.log(err);
            if(err.code = 'P2025'){
                return res.status(404).json({ error: 'not Found!' });
            };
            return res.status(500).json({ error: 'Internal server error' });
        };
    };

    async createCompany(req, res) {
        try {
            const { name, email, cnpj, role = 'CLIENTE' } = req.body

            if (!name || !email || !cnpj) {
                return res.status(400).json({
                    error: "name, email and cnpj is required."
                });
            };
            const company = { name, email, cnpj, role };

            const newCompany = await this.companyRepo.save(company);
            return res.status(201).json({ company: newCompany });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        };
    };

    async getCompanyById(req, res) {
        try {
            const { id } = req.params
            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({ error: 'ID is not valid!' });
            };
            const company = await this.companyRepo.getCompanyById(Number(id));
            return res.status(200).json({ company });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        };
    };

    async getCompanyByName(req, res) {
        try {
            const { name } = req.query;
            if (!name) {
                return res.status(400).json({ error: 'name is not valid or empty' });          
            };
            const company = await this.companyRepo.getCompanyByName(name);

            return res.status(200).json({ company });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        };
    };

    async getCompanyByEmail(req, res) {
        try {
            const { email } = req.query;
            if (!email) {
                return res.status(400).json({ error: 'email is not valid or empty' });          
            };
            const company = await this.companyRepo.getCompanyByEmail(email);
            return res.status(200).json({ company });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        };
    };
};

module.exports = { CompanyController };
