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

// Rota para buscar dados de um usuário específico
// URL final: GET /api/usuarios/:id
router.get('/:id', async (req, res) => {
  try {
    // Extrair o ID do usuário da URL
    const usuarioId = req.params.id

    // Validar se o ID foi informado
    if (!usuarioId) {
      return res.status(400).json({ erro: 'ID do usuário é obrigatório' })
    }

    //Buscar o usuário no banco (excluindo a senha)
    const [usuarios] = await db.query(
      `SELECT id, nome, email, telefone, data_cadastro 
             FROM usuarios 
             WHERE id = ?`,
      [usuarioId]
    )

    // Verificar se o usuário existe
    if (usuarios.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    //  Retornar os dados do usuário
    res.json(usuarios[0])

  } catch (error) {
    console.error('❌ Erro ao buscar usuário:', error)
    res.status(500).json({ erro: 'Erro interno do servidor' })
  }
})


// Rota para atualizar dados de um usuário
// URL final: PUT /api/usuarios/:id
router.put('/:id', async (req, res) => {
  try {
    // Extrair o ID da URL
    const usuarioId = req.params.id

    // Extrair os dados do corpo da requisição
    const { nome, email, telefone } = req.body

    // Validar se o ID foi informado
    if (!usuarioId) {
      return res.status(400).json({ erro: 'ID do usuário é obrigatório' })
    }

    // Validar se pelo menos um campo foi enviado
    if (!nome && !email && !telefone) {
      return res.status(400).json({ erro: 'Nenhum dado para atualizar' })
    }

    // Verificar se o usuário existe
    const [usuarios] = await db.query(
      'SELECT id FROM usuarios WHERE id = ?',
      [usuarioId]
    )

    if (usuarios.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    // Construir a query de atualização (apenas campos enviados)
    const updates = []
    const valores = []

    const adicionarCampo = (campo) => {
      if (req.body[campo]) {
        updates.push(`${campo} = ?`)
        valores.push(req.body[campo])
      }
    }

    adicionarCampo('nome')
    adicionarCampo('email')
    adicionarCampo('telefone')

    // Adicionar o ID no final dos valores
    valores.push(usuarioId)
    const sql = `UPDATE usuarios SET ${updates.join(', ')} WHERE id = ?`

    // Executar a atualização
    await db.query(sql, valores)

    // Retornar sucesso
    res.status(200).json({
      mensagem: 'Usuário atualizado com sucesso'
    })

  } catch (error) {
    console.error('❌ Erro ao atualizar usuário:', error)
    res.status(500).json({ erro: 'Erro interno do servidor' })
  }
})

module.exports = router