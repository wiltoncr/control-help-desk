const { prisma } = require('../../../infra/database/prismaCliente');

class AccessRepo {
  async getAccess() {
    const access = await prisma.access.findMany({
      include: {
        clients: {
          select: {
            Client: true,
          },
        },
      },
    });

    access.forEach((ac) => {
      if (typeof ac.clients[0] !== 'undefined') {
        ac.client = ac.clients[0].Client;
        delete ac.clients;
      } else {
        ac.client = { id: '', name: 'Não Encontrado!' };
        delete ac.clients;
      }
    });

    return access;
  }

  async deleteAccessById(id) {
    const access = await prisma.access.delete({
      where: { id },
      include: {
        clients: true,
      },
    });
    return access;
  }

  async save(payloadAccess) {
    const access = await prisma.access.create({ data: payloadAccess });
    return access ?? [];
  }

  async getAccessById(id) {
    const access = await prisma.access.findFirst({
      include: {
        clients: {
          select: {
            Client: true,
          },
        },
      },
      where: { id },
    });


    if (typeof access.clients[0] !== 'undefined') {
      access.client = access.clients[0].Client;
      delete access.clients;
    } else {
      access.client = { id: '', name: 'Não Encontrado!' };
      delete access.clients;
    }

    return access ?? [];
  }

  async getAccessByDesc(desc) {
    const access = await prisma.access.findFirst({
      where: {
        desc: {
          contains: desc,
          mode: 'insensitive',
        },
      },
    });
    return access ?? [];
  }
}

module.exports = { AccessRepo };
