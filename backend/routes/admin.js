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

module.exports = router