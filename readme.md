# Kenzie Market

Essa api foi desenvolvida com objetivos acadêmicos, proposta pela Kenzie Academy.

## Como instalar?

Faça o clone do repositório:

<https://gitlab.com/Felipe-Silva/market-manager>

Entre na pasta e rode o comando no terminal para instalar as dependências:

`yarn install`

Após a instalação rode o seguinte comando: 

`heroku run npx typeorm migration:run`

O sistema estará rodando em https://marketmanager.herokuapp.com/

Caso queira fazer os testes localmente, após o comando `yarn install`, tenha o <a href="https://docs.docker.com/get-started/">Docker</a> configurado e rode no terminal:

`docker-compose up`

abra outro terminal, digite:

`yarn dev`

ou

`npm run dev`

O sistema estará rodando em https://localhost:3000

## Utilização

Para utilizar este sistema, é necessário utilizar um API Client, como o Insomnia ou Postman

### Rotas
 
Acesse a documentação completa das rotas nesse <a href="https://marketmanager.herokuapp.com/api-documentation/">link</a>

## Tecnologias e linguagens utilizadas

- TypeScript
- Express.js
- Docker
- TypeORM
- Swagger
- Jest
- Nodemailer