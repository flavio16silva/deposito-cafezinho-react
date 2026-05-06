const express = require('express')
const router = express.Router()
const db = require('../db')


// Rota para salvar um novo pedido
router.post('/', async (req, res) => {
  try {
    // Extrai os dados enviados pelo frontend no corpo da requisição
    const { usuario_id, itens } = req.body

    // Valida se o usuario_id foi enviado
    if (!usuario_id) {
      return res.status(400).json({ erro: 'ID do usuário é obrigatório' })
    }

    // Valida se os itens foram enviados e é um array
    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ erro: 'Itens do pedido são obrigatórios' })
    }

    // Calcula o total usando reduce (forma mais moderna)
    const total = itens.reduce((acumulador, item) => acumulador + item.subtotal, 0)

    //Inserir o pedido no banco de dados - tabela pedidos
    const dataAtual = new Date()
    const statusPadrao = 'pendente'

    //Consulta SQL
    const sqlPedido = `
    INSERT INTO pedidos (usuario_id, data_pedido, status, total)
    VALUES (?, ?, ?, ?) `

    //Executa a consulta
    const [resultadoPedido] = await db.query(sqlPedido, [
      usuario_id,
      dataAtual,
      statusPadrao,
      total
    ])

    //Obtem ID do pedido criado
    const pedidoId = resultadoPedido.insertId

    //Inserir cada item do pedido na tabela itens_pedido
    for (const item of itens) {
      const sqlItem = `
        INSERT INTO itens_pedido 
        (pedido_id, produto_nome, quantidade, preco_unitario, subtotal)
        VALUES (?, ?, ?, ?, ?)
    `

      await db.query(sqlItem, [
        pedidoId,
        item.produto_nome,
        item.quantidade,
        item.preco_unitario,
        item.subtotal
      ])
    }

    // Retornar resposta de sucesso
    res.status(201).json({
      mensagem: 'Pedido realizado com sucesso',
      pedido: {
        id: pedidoId,
        data: dataAtual,
        status: statusPadrao,
        total: total
      }
    })


  } catch (error) {
    console.error('❌ Erro ao salvar pedido:', error)
    res.status(500).json({ erro: 'Erro interno do servidor' })
  }
})

module.exports = router






/*
// Importa o framework Express para criar rotas
const express = require('express')

// Cria um objeto de rotas independente
const router = express.Router()

// Importa a conexão com o banco de dados
const db = require('../db')
*/