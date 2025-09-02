const { prisma } = require('../../../infra/database/prismaCliente');

class CompanyRepo {
  async getCompany(idUser) {
      const company = await prisma.company.findMany({
        where: { CompanyUser: {
          some: {
            userId: idUser
          },
        },
      },
    });    
    return company;
  }

  async save(newCompany) {
    const company = await prisma.company.create({ data: newCompany });
    return company;
  }

  async getCompanyById(id, idUser) {
  const company = await prisma.company.findFirst({
    where: {
      id,
      CompanyUser: {
        some: {
          userId: idUser,
        },
      },
    },
  });
  return company ?? [];
}

  async deleteCompanyById(id, idUser) {
    const company = await prisma.company.delete({
      where:  {
        id,
        CompanyUser: {
          some: {
            userId: idUser,
          },
        },
      },
    });
    return company;
  }

  async getCompanyByName(name) {
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

  async getCompanyByEmail(email) {
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

  async update(payloadCompany) {
    const { id, ...data } = payloadCompany;

    const company = await prisma.company.update({
      where: { id },
      data
    });
  
  return company ?? [];
  }
}

module.exports = { CompanyRepo };
