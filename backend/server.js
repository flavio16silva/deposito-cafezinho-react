require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

const promisePool = pool.promise()

// Rota de teste
app.get('/api/teste', (req, res) => {
  res.json({ mensagem: 'Backend funcionando!' })
})

// Importar rotas
//usuarios
const usuariosRoutes = require('./routes/usuarios')
app.use('/api/usuarios', usuariosRoutes)

//login
const loginRoutes = require('./routes/login')
app.use('/api/login', loginRoutes)



app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`)
  console.log(`📡 Teste: http://localhost:${PORT}/api/teste`)
  console.log(`📋 Usuários: http://localhost:${PORT}/api/usuarios`)
})