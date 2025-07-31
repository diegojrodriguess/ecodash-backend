# Ecodash API

Ecodash é uma API RESTful desenvolvida com NestJS para gerenciamento de projetos ambientais e seus respectivos pesquisadores.

---

## ✅ Tecnologias

- [NestJS](https://nestjs.com/) com TypeORM
- PostgreSQL via Docker
- Node.js
- Testes com Jest
- DTOs para validação de dados

---

## ⚙️ Requisitos

- Node.js (v18+)
- Docker e Docker Compose

---

## 🚀 Instalação e Execução

### 1. Clonar o projeto

```bash
git clone https://github.com/seu-usuario/ecodash.git
cd ecodash

2. Instale as dependências

```bash
npm install
```

3. Subir a imagem do banco de dados via Docker
```bash
docker-compose up -d
```

O banco ficará disponível em:
```bash
host: localhost  
port: 5434  
user: ecodash  
password: ecodash_password  
database: ecodash_db
```

4. Rodar o servidor:
```bash
npm run start
```

A API estará disponível em: http://localhost:3000

## 🧪 Testes

### Rodar testes unitários
```bash
npm run test
```
### Gerar relatório de cobertura
```bash
npm run test:cov
```

## 🧪 Testar a API com o Postman
Utilize a collection ecodash_api.json (localizada na raiz do projeto).

### Passos:
1. Importe a collection no Postman.
2. Certifique-se que a API está rodando em http://localhost:3000.
3. Teste os endpoints disponíveis:

    /projects

    /researchers

## 📚 Documentação Interativa (Swagger)
A Ecodash API conta com documentação interativa via Swagger.

### Passos
Depois de subir a API com npm run start, acesse:
```bash
http://localhost:3000/api
```

### Funcionalidades do Swagger:

1. Explora todos os endpoints disponíveis
2. Visualiza exemplos de requisição e resposta
3. Testa chamadas diretamente do navegador
4. Exibe validações feitas nos DTOs

