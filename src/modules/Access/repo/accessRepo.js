const { prisma, connect } = require('../../../infra/database/prismaCliente');

class AccessRepo {
  async getAccess(id) {
    const access = await prisma.access.findMany(
    {
      where: {
        clients:{
          some: {
            Client: {
              CompanyClient: {
                some: {
                  Company: {
                    CompanyUser:{
                      some: {
                        userId: id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
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

  async deleteAccessById(id, idUser) {

    const accessExists = await prisma.access.findFirst({
      where: {
        clients:{
          some: {
            Client: {
              CompanyClient: {
                some: {
                  Company: {
                    CompanyUser:{
                      some: {
                        userId: idUser
                      }
                    }
                  }
                }
              }
            }
          }
        },
        id
      }
    });
  
    if (!accessExists) {
      throw new Error("Access not found");
    };

    const clientAccesses = await prisma.clientAccess.findFirst({
      where: { accessId: id }
    });

    const result = await prisma.$transaction(async (prisma) => {

    if(clientAccesses) {
      await prisma.clientAccess.delete({where: {id : clientAccesses.id}});
   };
        
        
    const access = await prisma.access.delete({
      where: { id },
      include: {
         clients: true,
        },
    });

    return access ?? [];
  });
    return result ?? [];
  }

  async save(payloadAccess, idUser) {
    const { idClient, ...data } = payloadAccess;

    const clientExists = await prisma.client.findFirst({
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
      id: Number(idClient)
    },
    });

    if (!clientExists) {
      throw new Error('Cliente não encontrado');
    };

    const access = await prisma.access.create({ data });
    
    await prisma.clientAccess.create({
      data: {
        accessId: Number(access.id),
        clientId: Number(idClient)
      }
    });

    
    return access ?? [];
  }

  async update(payloadAccess, idUser) {
    const { id, idClient, ...data } = payloadAccess;
  
    const clientExists = await prisma.client.findFirst({
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
      id: Number(idClient)
    },
    });

    if (!clientExists) {
      throw new Error('Cliente não encontrado');
    };

      const clientAccesses = await prisma.clientAccess.findFirst({
      where: { accessId: id }
    });

    await prisma.clientAccess.update({
      where: { id: clientAccesses.id },
      data: {
        clientId: Number(idClient),
      }
    });

    const access = await prisma.access.update({
      where: { id },
      data,
      include: {
        clients: {
          take: 1,
          select: {
            Client: true,
          },
        },
      }
    });

    const ac = access.clients[0].Client;

    if (typeof ac !== 'undefined') {
        access.client = {...ac};
        delete access.clients;
      } else {
        access.client = { id: 0, name: 'Não Encontrado!' };
        delete access.clients;
      };

  
    return access ?? [];
  }

  async getAccessById(id, idUser) {

    const access = await prisma.access.findMany(
      {
        where: {
          clients:{
            some: {
              Client: {
                CompanyClient: {
                  some: {
                    Company: {
                      CompanyUser:{
                        some: {
                          userId: idUser
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          id
        },
        include: {
          clients: {
            select: {
              Client: true,
            },
          },
        },
      });

    if (typeof access[0].clients[0] !== 'undefined') {
      access[0].client = access[0].clients[0].Client;
      delete access[0].clients;
    } else {
      access[0].client = { id: '', name: 'Não Encontrado!' };
      delete access[0].clients;
    }

    return access[0] ?? [];
  }

  async getAccessByDesc(desc, idUser) {
    const access = await prisma.access.findFirst({
      where: {
        clients:{
          some: {
            Client: {
              CompanyClient: {
                some: {
                  Company: {
                    CompanyUser:{
                      some: {
                        userId: idUser
                      }
                    }
                  }
                }
              }
            }
          }
        },
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
