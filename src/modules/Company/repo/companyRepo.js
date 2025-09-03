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

  async save(newCompany, idUser) {
    const company = await prisma.company.create({ data: newCompany });

    await prisma.companyUser.create(({
      data: {
        userId: idUser,
        companyId: company.id,
      },
    }));
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

  async getCompanyByName(name, idUser) {
    const company = await prisma.company.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        CompanyUser: {
          some: {
            userId: idUser,
          },
        },
      },
    });
    return company ?? [];
  }

  async getCompanyByEmail(email, idUser) {
    const company = await prisma.company.findFirst({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
        CompanyUser: {
          some: {
            userId: idUser,
          },
        },
      },
    });
    return company ?? [];
  }

  async update(payloadCompany, idUser) {
    const { id, ...data } = payloadCompany;

    const company = await prisma.company.update({
      where: {
        id,
        CompanyUser: {
          some: {
            userId: idUser,
          },
        },
       },
      data
    });
    return company ?? [];
  }
}

module.exports = { CompanyRepo };
