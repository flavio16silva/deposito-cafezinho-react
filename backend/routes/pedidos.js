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



// Rota para listar os pedidos de um usuário específico
// URL final: GET /api/pedidos/usuario/:id
router.get('/usuario/:id', async (req, res) => {
  try {
    //Extrair o ID do usuário da URL
    const usuarioId = req.params.id

    //Validar se o ID foi informado
    if (!usuarioId) {
      return res.status(400).json({ erro: 'ID do usuário é obrigatório' })
    }

    //Buscar todos os pedidos do usuário na tabela pedidos
    const sqlPedidos = `
    SELECT id, data_pedido, status, total
    FROM pedidos
    WHERE usuario_id = ? AND ativo = 1
    ORDER BY data_pedido DESC
`

    const [pedidos] = await db.query(sqlPedidos, [usuarioId])

    //Verificar se encontrou algum pedido
    if (pedidos.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum pedido encontrado para este usuário' })
    }

    //Buscar itens de cada pedido
    for (const pedido of pedidos) {
      const sqlItens = `
        SELECT produto_nome, quantidade, preco_unitario, subtotal
        FROM itens_pedido
        WHERE pedido_id = ?
    `

      const [itensDoPedido] = await db.query(sqlItens, [pedido.id])
      pedido.itens = itensDoPedido
    }

    //Retornar a lista de pedidos (ainda sem os itens - próximo bloco)
    res.json(pedidos)

  } catch (error) {
    console.error('❌ Erro ao buscar pedidos:', error)
    res.status(500).json({ erro: 'Erro interno do servidor' })
  }
})

// Rota para Ocultar um pedido (exclusão lógica)
// URL final: DELETE /api/pedidos/:id
router.delete('/:id', async (req, res) => {
  try {
    // Extrair o ID do pedido da URL
    const pedidoId = req.params.id

    // Validar se o ID foi informado
    if (!pedidoId) {
      return res.status(400).json({ erro: 'ID do pedido é obrigatório' })
    }

    // Verificar se o pedido existe
    const [pedidoExistente] = await db.query(
      'SELECT id, ativo FROM pedidos WHERE id = ?',
      [pedidoId]
    )

    if (pedidoExistente.length === 0) {
      return res.status(404).json({ erro: 'Pedido não encontrado' })
    }

    // Verificar se o pedido já está oculto
    if (pedidoExistente[0].ativo === 0) {
      return res.status(400).json({ erro: 'Pedido já está oculto' })
    }

    //Ocultar o pedido (exclusão lógica)
    await db.query('UPDATE pedidos SET ativo = 0 WHERE id = ?', [pedidoId])

    // Retornar mensagem de sucesso
    res.status(204).send()

  } catch (error) {
    console.error('❌ Erro ao ocultar pedido:', error)
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