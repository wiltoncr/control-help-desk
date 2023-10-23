
const {prisma}  = require( '../../../infra/database/prismaCliente.js');

class ClientRepo {

    async getClient() {
        const client = await prisma.client.findMany();
        return client;
    }
    async save(payloadClient) {
        const client = await prisma.client.create({ data: payloadClient });
        return client;
    };

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
    async getClientByName(name) {
        const client = await prisma.client.findFirst({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });
        return client ?? [];
    };

    async getClientByEmail(email) {
        const client = await prisma.client.findFirst({
            where: {
                email: {
                    contains: email,
                    mode: 'insensitive'
                }
            }
        });
        return client ?? [];
    };

};

module.exports = {ClientRepo};
