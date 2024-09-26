## Gestão de Refeições
Um sistema para gerenciar refeições, permitindo que os usuários acompanhem suas refeições diárias, incluindo detalhes como nome, descrição, tipo de dieta e horários. O projeto utiliza Node.js, Express, Prisma e MySQL.


## Tabela de Conteúdos

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Rotas da API](#rotas-da-api)

## Recursos

- Cadastro, edição e remoção de refeições.
- Filtragem de refeições por tipo de dieta.
- Obtenção da melhor sequência de refeições dentro da dieta.
- Armazenamento seguro de dados de usuários e refeições.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript do lado do servidor.
- **Express** - Framework para construir APIs web.
- **Prisma** - ORM para interagir com o banco de dados.
- **MySQL** - Sistema de gerenciamento de banco de dados relacional.
- **JWT** - Autenticação de usuário via token.
- **Docker** - Sobe uma instância do banco de dados MySQL.

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/gestao-refeicao.git
   cd gestao-refeicao

2. **Instalar dependencias:**
   ```bash
   npm install

3. **Configure o banco de dados:**
   ```bash
   DATABASE_URL="mysql://<user>:<password>@localhost:3306/<database-name>"
   ```
   ***Não se esqueça de configurar o seu Docker file***
   
4. **Inicie o Container Docker:**
   ```bash
   docker-compose up -d

5. **Execute as Migrações do Prisma:**
    ```bash
    npx prisma migrate dev

6. **Execute o servidor:**
    ```bash
    npm run dev (nodemon)
    ou
    npm run start

## Rotas da API

**Refeição**

| Método | Rota                      | Descrição                                   |
|--------|---------------------------|---------------------------------------------|
| GET    | `/refeicao`               | Retorna todas as refeições.                 |
| GET    | `/refeicao/one/:id`       | Retorna uma refeição específica pelo ID.    |
| GET    | `/refeicao/total`         | Retorna o total de refeições.               |
| GET    | `/refeicao/diet`          | Retorna as refeições que estão dentro da dieta.|
| POST   | `/refeicao`               | Cria uma nova refeição.                     |
| PUT    | `/refeicao/:id`           | Atualiza as informações de uma refeição específica pelo ID.   |
| DELETE | `/refeicao/:id`           | Remove uma refeição específica pelo ID.     |

**Usuário**

| Método | Rota             | Descrição                                 |
|--------|------------------|-------------------------------------------|
| GET    | `/user`          | Retorna todos os usuários.                |
| GET    | `/user/:id`      | Retorna um usuário específico pelo ID.    |
| POST   | `/user`          | Cria um novo usuário.                     |
| PUT    | `/user/:id`      | Atualiza um usuário específico pelo ID.   |
| DELETE | `/user/:id`      | Remove um usuário específico pelo ID.     |


