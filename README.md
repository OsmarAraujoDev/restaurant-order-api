# 🚀 Restaurant Order Api

API RESTful de gerenciamento de pedidos para restaurantes com Node.js, Express e MySQL.

![Node.js](https://img.shields.io/badge/Node.js-22.17-green)
![License](https://img.shields.io/badge/CC0-1.0-Universal)

---

## ✨ Funcionalidades

- 👤 Cadastro e Login de usuários
- 📊 CRUD de produtos e pedidos
- 🔎 Filtros avançados de usuários, produtos e pedidos
- ✅ Validação de dados com Joi

---

## 📦 Estrutura de Pastas

```
scripts/
src/
  config/
  models/
  services/
  controllers/
  routes/
  validations/
  app.js
server.js
.env
.gitignore
```

---

## 🛠 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Joi](https://joi.dev/) (Validação)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (Hash de senha)
- [dotenv](https://github.com/motdotla/dotenv) (Variáveis de ambiente)

---

## ⚡ Instalação e Execução

```bash
git clone https://github.com/OsmarAraujoDev/restaurant-order-api.git
cd restaurant-order-api
npm install
npm start
```

---

## 🔐 Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```
HOSTNAME=localhost
PORT=3000

DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

Veja o exemplo em [.env.example](.env.example).

---

## 📚 Exemplos de Endpoints

### Usuários

- **Cadastrar usuário:**  
  `POST /users`  
  ```json
  {
    "nickname": "Seu Nome",
    "email": "email@exemplo.com",
    "phone": "55999999999",
    "password": "senhaSegura123"
  }
  ```

- **Login:**  
  `POST /users/login`  
  ```json
  {
    "email": "email@exemplo.com",
    "password": "senhaSegura123"
  }
  ```

### Produtos

- **Criar produtos:**  
  `POST /products/`  
  ```json
  {
    "name": "Pizza",
    "description": "Pizza com tomate e queijo",
    "price": 50.00
  }
  ```

- **Listar produtos:**  
  `GET /products/`

  ### Pedidos

- **Criar pedidos:**  
  `POST /orders/`  
  ```json
  {
    "address": {
        "street": "Rua Bandeirantes",
        "city": "Rondonópolis",
        "state": "MT",
        "number": "1000",
        "observation": "Em frente a sorveteria"
    },
    "paymentMethod": 1,
    "products": [
        {
            "id": 1,
            "price": 10.50,
            "quantity": 2,
            "observation": "Sem cebola"
        },
        {
            "id": 2,
            "price": 11.25,
            "quantity": 1
        }
    ],
    "observation": "Estou esperando"
  }

- **Listar pedidos:**  
  `GET /orders/`

---

## 📖 Licença

Distribuído sob a [CC0 1.0 UNIVERSAL](LICENSE).

---

## 👤 Autor

Feito por **Osmar Araujo**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/osmar-araujo-a88bb1396/)