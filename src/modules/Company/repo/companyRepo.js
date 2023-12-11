const { prisma } = require('../../../infra/database/prismaCliente');

class CompanyRepo {
  static async getCompany() {
    const company = await prisma.company.findMany();
    return company;
  }

  static async save(newCompany) {
    const company = await prisma.company.create({ data: newCompany });
    return company;
  }

  static async getCompanyById(id) {
    const company = await prisma.company.findFirst({
      where: { id },
    });
    return company ?? [];
  }

  static async deleteCompanyById(id) {
    const company = await prisma.company.delete({
      where: { id },
    });
    return company;
  }

  static async getCompanyByName(name) {
    const company = await prisma.company.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    return company ?? [];
  }

  static async getCompanyByEmail(email) {
    const company = await prisma.company.findFirst({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      },
    });
    return company ?? [];
  }
}

module.exports = { CompanyRepo };
