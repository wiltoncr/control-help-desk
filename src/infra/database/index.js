const { connect, disconnect } = require('./prismaCliente.js');

async function main() {
  try {
    await connect()
    // use a instância do cliente Prisma aqui
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
  } finally {
    await disconnect()
  }
}

main()