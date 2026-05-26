const express = require('express')
const router = express.Router()
const db = require('../db')

//Rota para lista todos os pedidos
//URL: GET /api/admin/pedidos
router.get('/pedidos', async (req, res) => {
  try {
    //Buscar todos os pedidos pelos dados do usuário
    const [pedidos] = await db.query(`
      SELECT
        p.id,
        p.data_pedido,
        p.status,
        p.total,
        u.id as usuario_id,
        u.nome as cliente_nome,
        u.telefone as cliene_telefone
      FROM pedidos p
      JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY p.data_pedido DESC
    `)

    //Para cada pedido buscar seus itens
    await Promise.all(pedidos.map(async (pedido) => {
      const [itens] = await db.query(`
        SELECT produto_nome, quantidade, preco_unitario, subtotal
        FROM itens_pedido
        WHERE pedido_id = ?  
      `, [pedido.id])

      //Adiciona os itens ao pedido
      pedido.itens = itens
    }))

    //Retornar a lista completa
    res.json(pedidos)

  } catch (error) {
    console.error('❌ Erro ao buscar pedidos admin:', error)
    res.status(500).json({ erro: 'Erro interno do servidor' })
  }
})

// Rota para atualizar o status de um pedido
// URL final: PUT /api/admin/pedidos/:id/status
router.put('/pedidos/:id/status', async (req, res) => {
  try {
    //Extrair o id do pedido da URL
    const pedidoId = req.params.id

    //Extrair o novo status do corpo da requisição
    const { status } = req.body

    const statusPermitidos = ['pendente', 'preparando', 'entregue', 'cancelado']
    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' })
    }

    //Verificar se o pedido existe
    const [pedido] = await db.query(
      'SELECT id FROM pedidos WHERE id = ?',
      [pedidoId]
    )

    if (pedido.length === 0) {
      return res.status(400).json({ erro: 'Pedido não encontrado ' })
    }

    //Atualizar o status no banco
    await db.query(
      'UPDATE pedidos SET status = ? WHERE id = ?',
      [status, pedidoId]
    )

    //Retornar sucesso
    res.status(200).json({
      mensagem: `Status do pedido ${pedidoId} atualizado para ${status}`
    })

  } catch (error) {
    console.error('❌ Erro ao atualizar status:', error)
    res.status(500).json({ erro: 'Erro interno do servidor' })
  }
})

module.exports = router