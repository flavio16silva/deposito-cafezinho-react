const express = require('express')
const router = express.Router()
const db = require('../db')

//Rota de login
router.post('/', async (req, res) => {
  try {
    //Extrair os dados enviados no corpo da requisição
    const { telefone, senha } = req.body

    //Verificar se os campos foram enviados
    if (!telefone || !senha) {
      return res.status(400).json({ erro: 'Telefone e senha são obrigatórios' })
    }

    //Buscar usuário pelo telefone
    const [usuarios] = await db.query(
      'SELECT id, nome, telefone, email, senha, data_cadastro FROM usuarios WHERE telefone = ?', [telefone]
    )

    //Verificar se o usuário foi encontrado
    if (usuarios.length === 0) {
      return res.status(401).json({ erro: 'Telefone ou senha inválidos' })
    }
    const usuario = usuarios[0]

    // Verificar se a senha está correta
    if (senha !== usuario.senha) {
      return res.status(401).json({ erro: 'Telefone ou senha inválidos' })
    }

    // Login bem-sucedido
    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        data_cadastro: usuario.data_cadastro
      }
    })

  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({
      erro: 'Erro interno do servidor', detalhe: error.message
    })
  }
})

module.exports = router