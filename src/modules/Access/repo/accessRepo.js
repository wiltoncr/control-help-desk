
const {prisma}  = require( '../../../infra/database/prismaCliente.js');

class AccessRepo {

    async getAccess() {
        const access = await prisma.access.findMany({
            include: {
              clients: {
                select:{
                    Client: true
                },
              },
            },
          });
          access.forEach(ac => {
            if(typeof ac.clients[0] != 'undefined') {
                ac.client = ac.clients[0].Client;
                delete ac.clients;
            }else {
                ac.client = {id: '', name : 'Não Encontrado!'};
                delete ac.clients;
            }
          });
          
        return access;
    }

    async deleteAccessById(id) {
        const access = await prisma.access.delete({
            where: { id: id },
            include: {
                clients: true
            }
        })
        return access
    }

    async save(payloadAccess) {
        await prisma.access.create({ data: payloadAccess });
    }
    async getAccessById(id) {
        const access = await prisma.access.findFirst({
            where: { id: id }
        })
        return access
    }
    async getAccessByDesc(desc) {
        const access = await prisma.access.findFirst({
            where: {
                desc: {
                    contains: desc,
                    mode: 'insensitive'
                }
            }
        })
        if (!access) {
            return { mensagem: `Acesso com nome: ${desc} não encontrado` }
        }
        return access
    }

}

module.exports = {AccessRepo};
