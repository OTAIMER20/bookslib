# Instruções para Testar a API

## 1. Criar Usuário (Publisher)

**POST** `http://localhost:3000/users`

```json
{
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@example.com",
  "password": "senha123",
  "age": 28,
  "role": "publisher"
}
```

**Resposta esperada:**
```json
{
  "id": "uuid-aqui",
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@example.com",
  "role": "publisher"
}
```

---

## 2. Login (Fazer Login)

**POST** `http://localhost:3000/login`

```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

⚠️ **IMPORTANTE:** Copie o `token` recebido!

---

## 3. Criar Livro (Com Autenticação)

**POST** `http://localhost:3000/books`

**Headers necessários:**
```
Authorization: Bearer <COLE_O_TOKEN_AQUI>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "O Pequeno Príncipe",
  "genre": "Ficção Infantil",
  "resume": "Uma história mágica sobre um jovem príncipe que viaja pelos planetas",
  "author": "Antoine de Saint-Exupéry",
  "ageRating": 6,
  "publishedDate": "2024-11-30"
}
```

---

## Como Testar no Insomnia/Postman

### Para o Insomnia:
1. Em cada request, vá em **Auth** → **Bearer Token**
2. Cole o token recebido do login

### Para o Postman:
1. Em cada request, vá em **Authorization**
2. Selecione **Bearer Token**
3. Cole o token recebido do login

---

## Exemplos de Teste com cURL

```bash
# 1. Criar usuário
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@example.com",
    "password": "senha123",
    "age": 28,
    "role": "publisher"
  }'

# 2. Login
TOKEN=$(curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }' | jq -r '.token')

# 3. Criar livro (usando o token)
curl -X POST http://localhost:3000/books \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "O Pequeno Príncipe",
    "genre": "Ficção Infantil",
    "resume": "Uma história mágica sobre um jovem príncipe que viaja pelos planetas",
    "author": "Antoine de Saint-Exupéry",
    "ageRating": 6,
    "publishedDate": "2024-11-30"
  }'
```
