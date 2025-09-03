const { prisma } = require('../../../infra/database/prismaCliente');

class ClientRepo {
  async getClient(idUser) {
    const client = await prisma.client.findMany({
      where: { CompanyClient:{
        some: {
          Company: {
            CompanyUser:{
              some:{
                userId: idUser
              },
            },
          },
        },
      },
    },
    });
    return client;
  }

  async save(payloadClient, companyId) {
    const client = await prisma.client.create({ data: payloadClient });

    await prisma.companyClient.create(({
      data: {
        clientId: client.id,
        companyId,
      },
    }));

    return client;
  }

  async deleteClientById(id) {
    const client = await prisma.client.delete({
      where: { id },
    });
    return client;
  }

  async getClientById(id) {
    const client = await prisma.client.findFirst({
      where: { id },
    });
    return client;
  }

  async getClientByName(name) {
    const client = await prisma.client.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    return client ?? [];
  }

  async getClientByEmail(email) {
    const client = await prisma.client.findFirst({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      },
    });
    return client ?? [];
  }

  
  async getByCompany(idUser, companyId) {
    const client = await prisma.client.findMany({
      where: { CompanyClient:{
        some: {
          Company: {
            CompanyUser:{
              some:{
                userId: idUser
              },
            },
            id: companyId,
          },
        },
      },
    },
    });
    return client;
  }

  async update(payloadClient) {
    const { id, ...data } = payloadClient;

    const client = await prisma.client.update({
      where: { id },
      data
    });
  
    return client ?? [];
  }
}

module.exports = { ClientRepo };
