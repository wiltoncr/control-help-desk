# help desk - Easy Control

## Aplicativo simples em JavaScript(NodeJs) usando MVC

Este sistema é uma plataforma de gerenciamento de acesso remoto projetada para ajudar desks de suporte técnico a acessar facilmente os sistemas de seus clientes de maneira centralizada. Ele oferece suporte à inclusão de várias empresas prestadoras de serviços, permitindo o cadastramento de clientes e o gerenciamento de acessos a suas máquinas, incluindo ferramentas como AnyDesk, TeamViewer e outras. Este sistema ainda está em desenvolvimento, e você é bem-vindo para contribuir para a sua finalização. O projeto é de código aberto e gratuito, promovendo a colaboração e a comunidade de suporte técnico.

## Este repositório <img height="32" width="32" src="https://unpkg.com/simple-icons@v9/icons/github.svg" />

[https://github.com/wiltoncc/control-help-desk](https://github.com/wiltoncr/control-help-desk)

## Instalação
Você pode seguir estas etapas para usar o projeto: 

1. Clone o repositório: `git clone https://github.com/wiltoncr/control-help-desk.git`
2. Baixe os pacotes do projeto: `npm instal`
3. Construa o banco de dados do projeto: `npx prisma db push`
4. Execute o aplicativo: `npm start` ou `npm start:dev` para rodar como dev usando webpack

## Alterar o banco padrão Postgres.
/src/infra/database/schema.prisma
```code 
  datasource db {
  provider = "SEU BANCO AQUI"
  url      = env("DATABASE_URL")
}
```

## Configurar o banco
Crie o .env e coloque as credencias do banco e porta do servidor:</br>
PORT=SUA PORTA</br>
DATABASE_URL=postgres://USUARIO:SENHA@HOST/BANCO
## Fotos 
![Texto Alternativo](screenshots/homePage.png)
![Texto Alternativo](screenshots/grid.png)
![Texto Alternativo](screenshots/menuBurger.png)
![Texto Alternativo](screenshots/modalRegister.png)
## primeiro usuário
email:teste@teste.com
senha:teste1

insert into User(email, password, name) values('teste@teste.com', '$2a$08$NELmFtgn7t8op3jhZCruVeM/k18.XTOjTbS/M2jh4UQaYkggz5/Om', 'SUPORTE')
## Licença

Este projeto está sob a licença MIT.
Isto significa que você pode usar e modificar ele livremente para projetos pessoais e comerciais, apenas preservando o crédito dos autores.
