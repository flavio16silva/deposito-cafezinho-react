const express = require('express')
const router = express.Router()
const db = require('../db')

// Rota: listar usuários
router.get('/', async (req, res) => {
  try {
    console.log('📡 Requisição recebida em /api/usuarios')
    const [rows] = await db.query('SELECT id, nome, email, telefone, data_cadastro FROM usuarios')
    console.log(`✅ Encontrados ${rows.length} usuários`)
    res.json(rows)
  } catch (error) {
    console.error('❌ Erro na consulta:', error.message)
    res.status(500).json({ erro: error.message })
  }
})

// ROTA: CADASTRO DE USUÁRIO (POST)
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, telefone, senha } = req.body

    if (!nome || !email || !telefone || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ erro: 'E-mail inválido' })
    }

    if (senha.length < 6) {
      return res.status(400).json({ erro: 'A senha deve ter no mínimo 6 caracteres' })
    }

    const [existentes] = await db.query(
      'SELECT id FROM usuarios WHERE email = ? OR telefone = ?',
      [email, telefone]
    )

    if (existentes.length > 0) {
      return res.status(409).json({ erro: 'E-mail ou telefone já cadastrado' })
    }

    const [resultado] = await db.query(
      `INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)`,
      [nome, email, telefone, senha]
    )

    const [novoUsuario] = await db.query(
      'SELECT id, nome, email, telefone, data_cadastro FROM usuarios WHERE id = ?',
      [resultado.insertId]
    )

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso',
      usuario: novoUsuario[0]
    })

  } catch (error) {
    console.error('❌ Erro no cadastro:', error)
    res.status(500).json({ erro: 'Erro interno do servidor', detalhe: error.message })
  }
})

module.exports = router