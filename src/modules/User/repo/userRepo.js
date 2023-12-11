const bcryptjs = require('bcryptjs');
const { prisma } = require('../../../infra/database/prismaCliente');

class UserRepo {
  static async getUsers() {
    const user = await prisma.user.findMany();
    return user;
  }

  static async save(newUser) {
    const user = await prisma.user.create({ data: newUser });
    return user;
  }

  static async getUserById(id) {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    return user ?? [];
  }

  static async deleteUserById(id) {
    const user = await prisma.user.delete({
      where: { id },
    });
    if (!user) {
      return { mensagem: `user com Id: ${id} não encontrado` };
    }

    return user;
  }

  static async getUserByName(name) {
    const user = await prisma.user.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    return user ?? [];
  }

  static async getUserByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      },
    });

    return user;
  }

  static async passwordIsValid(password, hash) {
    const result = await bcryptjs.compare(password, hash);
    return result;
  }
}

module.exports = { UserRepo };
