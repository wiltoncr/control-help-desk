
const {prisma} = require( '../../../infra/database/prismaCliente.js');

class UserRepo {

    async getUsers() {
        const user = await prisma.user.findMany()
        return user;
    }

    async save(user) {
        await prisma.user.create({ data: user })
    }
    async getUserById(id) {
        const user = await prisma.user.findFirst({
            where: { id: id }
        })
        return user
    }

    async deleteUserById(id) {
        const user = await prisma.user.delete({
            where: { id: id }
        })
        return user
    }

    async getUserByName(name) {
        const user = await prisma.user.findFirst({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        })
        if (!user) {
            return { mensagem: `user com nome: ${name} não encontrado` }
        }
        return user
    }

    async getUserByEmail(email) {
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    contains: email,
                    mode: 'insensitive'
                }
            }
        })
        if (!user) {
            return { mensagem: `user com email: ${email} não encontrado` }
        }
        return user
    }

}

module.exports = {UserRepo}
