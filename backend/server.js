require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Cria a conexão com o banco (pool de conexões)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

// Rota de teste
app.get('/api/teste', (req, res) => {
  res.json({ mensagem: 'Backend funcionando!' });
});

// Rota: listar usuários
app.get('/api/usuarios', async (req, res) => {
  try {
    console.log('📡 Requisição recebida em /api/usuarios');
    const [rows] = await promisePool.query('SELECT id, nome, email, telefone, data_cadastro FROM usuarios');
    console.log(`✅ Encontrados ${rows.length} usuários`);
    res.json(rows);
  } catch (error) {
    console.error('❌ Erro na consulta:', error.message);
    console.error('Detalhes:', error);
    res.status(500).json({
      erro: error.message,
      sql: error.sql,
      code: error.code
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📡 Teste: http://localhost:${PORT}/api/teste`);
  console.log(`📋 Usuários: http://localhost:${PORT}/api/usuarios`);
});