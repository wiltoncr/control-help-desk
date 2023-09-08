
const {prisma} = require( '../../../infra/database/prismaCliente.js');

class CompanyRepo {

    async getCompany() {
        const company = await prisma.company.findMany();
        return company;
    }

    async save(company) {
        await prisma.company.create({ data: company })
    }
    async getCompanyById(id) {
        const company = await prisma.company.findFirst({
            where: { id: id }
        })
        return company
    }

    async deleteCompanyById(id) {
        const company = await prisma.company.delete({
            where: { id: id }
        })
        return company
    }

    async getCompanyByName(name) {
        const company = await prisma.company.findFirst({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        })
        if (!company) {
            return { mensagem: `company com nome: ${name} não encontrado` }
        }
        return company
    }

    async getCompanyByEmail(email) {
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    contains: email,
                    mode: 'insensitive'
                }
            }
        })
        if (!user) {
            return { mensagem: `user com email: ${email} não encontrado` }
        }
        return user
    }


}

module.exports = {CompanyRepo};
