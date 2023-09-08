const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connect() {
  try {
    await prisma.$connect()
    console.log('Teste de Conexão com o banco de dados estabelecida com sucesso.')
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
  }
}

async function disconnect() {
  await prisma.$disconnect()
  console.log('Finzalizando teste com banco de dados.')
}

module.exports = {
  connect, disconnect, prisma
};