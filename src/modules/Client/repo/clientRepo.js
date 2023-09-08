
const {prisma}  = require( '../../../infra/database/prismaCliente.js');

class ClientRepo {

    async getClient() {
        const client = await prisma.client.findMany();
        return client;
    }
    async save(payloadClient) {
        await prisma.client.create({ data: payloadClient });
    }

    async deleteClientById(id) {
        const client = await prisma.client.delete({
            where: { id: id }
        })
        return client
    }

    async getClientById(id) {
        const client = await prisma.client.findFirst({
            where: { id: id }
        })
        return client
    }
    async getClientByDesc(desc) {
        const client = await prisma.client.findFirst({
            where: {
                desc: {
                    contains: desc,
                    mode: 'insensitive'
                }
            }
        })
        if (!client) {
            return { mensagem: `Cliente com nome: ${desc} não encontrado` }
        }
        return client
    };

}

module.exports = {ClientRepo};
