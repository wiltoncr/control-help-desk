const { prisma } = require('../../../infra/database/prismaCliente');

class ClientRepo {
  static async getClient() {
    const client = await prisma.client.findMany();
    return client;
  }

  static async save(payloadClient) {
    const client = await prisma.client.create({ data: payloadClient });
    return client;
  }

  static async deleteClientById(id) {
    const client = await prisma.client.delete({
      where: { id },
    });
    return client;
  }

  static async getClientById(id) {
    const client = await prisma.client.findFirst({
      where: { id },
    });
    return client;
  }

  static async getClientByName(name) {
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

  static async getClientByEmail(email) {
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
}

module.exports = { ClientRepo };
