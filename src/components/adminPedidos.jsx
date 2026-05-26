import { useState, useEffect } from "react"
import { toast } from 'react-toastify'

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [filtroId, setFiltroId] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')

  useEffect(() => {
    const buscarPedidos = async () => {
      try {
        setCarregando(true)
        setErro('')

        //Requisição para o backend
        const resposta = await fetch('http://localhost:3001/api/admin/pedidos')

        //Se a requisição foi bem sucedida
        if (!resposta.ok) {
          throw new Error('Erro ao carregar pedidos')
        }

        //Extrair os dados da resposta
        const dados = await resposta.json()

        //Salvar no estado
        setPedidos(dados)

      } catch (err) {
        console.error('Erro:', err)
        setErro(err.message)
      } finally {
        setCarregando(false)
      }
    }

    buscarPedidos()
  }, [])

  // Fitrar pedidos pelo Id e status
  const pedidosFiltrados = pedidos.filter(pedido => {
    //Filtro Id
    const matchId = filtroId === '' || pedido.id.toString().includes(filtroId)

    //Filtro Status
    const matchStatus = filtroStatus === '' || pedido.status === filtroStatus

    return matchId && matchStatus

  })

  //Calcular Totais do dia
  const hoje = new Date().toLocaleDateString('pt-BR')

  //Filtrar pedidos do dia 
  const pedidosHoje = pedidos.filter(pedido => {
    const dataPedido = new Date(pedido.data_pedido).toLocaleDateString('pt-BR')
    return dataPedido === hoje
  })

  //Calcular total de pedidos e valor total
  const totalPedidosHoje = pedidosHoje.length

  const valorTotalHoje = pedidosHoje.reduce((soma, pedido) => soma + Number(pedido.total), 0)

  const ticketMedioHoje = totalPedidosHoje > 0 ? valorTotalHoje / totalPedidosHoje : 0



  // FUNÇÃO PARA ATUALIZAR STATUS DO PEDIDO  
  const atualizarStatus = async (pedidoId, novoStatus) => {
    try {
      // 1. Enviar requisição para o backend
      const resposta = await fetch(`http://localhost:3001/api/admin/pedidos/${pedidoId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: novoStatus })
      })

      // 2. Verificar se deu certo
      if (!resposta.ok) {
        const erro = await resposta.json()
        throw new Error(erro.erro || 'Erro ao atualizar status')
      }

      // 3. Atualizar a lista local (sem recarregar tudo)
      setPedidos(pedidos.map(pedido =>
        pedido.id === pedidoId
          ? { ...pedido, status: novoStatus }
          : pedido
      ))

      // 4. Mostrar mensagem de sucesso (opcional)
      toast.success(`✅ Status do pedido ${pedidoId} atualizado para ${novoStatus}`)

    } catch (error) {
      console.error('Erro:', error)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-6">
          Gerenciar Pedidos
        </h1>
        {/*Exibir mensagem de erro*/}
        {erro && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            Erro: {erro}
          </div>
        )}

        {/*Exibir carregando*/}
        {carregando && (
          <div className="text-center text-gray-400 py-8">
            Carregando pedidos...
          </div>
        )}

        {/* Data atual */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-400 text-sm">
            📅 {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Card de totais do dia */}
        {!carregando && !erro && pedidos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
            {/* Card 1: Total de Pedidos */}
            <div className="bg-gray-800 rounded-lg p-2 sm:p-4 text-center">
              <p className="text-gray-400 text-xs sm:text-sm">📋 Pedidos</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{totalPedidosHoje}</p>
            </div>

            {/* Card 2: Valor Total */}
            <div className="bg-gray-800 rounded-lg p-2 sm:p-4 text-center">
              <p className="text-gray-400 text-xs sm:text-sm">💰 Total</p>
              <p className="text-sm sm:text-3xl font-bold text-amber-400">
                R$ {valorTotalHoje.toFixed(2)}
              </p>
            </div>

            {/* Card 3: Ticket Médio */}
            <div className="bg-gray-800 rounded-lg p-2 sm:p-4 text-center">
              <p className="text-gray-400 text-xs sm:text-sm">🎫 Ticket</p>
              <p className="text-sm sm:text-3xl font-bold text-green-400">
                R$ {ticketMedioHoje.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/*Pesquisar pedidos*/}
        <div className="mb-4 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="🔍 Buscar pedido pelo número..."
            value={filtroId}
            onChange={(e) => setFiltroId(e.target.value)}
            className="flex-1 min-w-30 bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-amber-500"
          />

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="flex-1 min-w-30 bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-amber-500"
          >
            <option value="">📋 Todos os status</option>
            <option value="pendente">📌 Pendente</option>
            <option value="preparando">👨‍🍳 Preparando</option>
            <option value="entregue">✅ Entregue</option>
            <option value="cancelado">❌ Cancelado</option>
          </select>

          {(filtroId || filtroStatus) && (
            <button
              onClick={() => {
                setFiltroId('')
                setFiltroStatus('')
              }}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-md"
            >
              ✕ Limpar Filtros
            </button>
          )}
        </div>

        {/* Exibir lista de pedidos */}
        {!carregando && !erro && pedidosFiltrados.length > 0 && (
          <div className="space-y-4">
            {pedidosFiltrados.map((pedido) => (
              <div key={pedido.id} className="bg-gray-800 rounded-lg p-4">
                {/* Cabeçalho do card */}
                <div className="flex justify-between items-start border-b border-gray-700 pb-2 mb-2">
                  <div>
                    <p className="text-gray-400 text-xs">
                      Pedido #{pedido.id}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(pedido.data_pedido).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className={`text-sm font-bold px-2 py-1 rounded-full
                            ${pedido.status === 'pendente' ? 'bg-yellow-500 text-yellow-900' : ''}
                            ${pedido.status === 'preparando' ? 'bg-blue-500 text-blue-900' : ''}
                            ${pedido.status === 'entregue' ? 'bg-green-500 text-green-900' : ''}
                            ${pedido.status === 'cancelado' ? 'bg-red-500 text-red-900' : ''}
                        `}>
                      {pedido.status}
                    </span>
                  </div>
                </div>

                {/* Dados do cliente */}
                <div className="mb-2">
                  <p className="text-white font-medium">{pedido.cliente_nome}</p>
                  <p className="text-gray-400 text-sm">{pedido.cliente_telefone}</p>
                </div>

                {/* Itens do pedido (resumo) */}
                <div className="text-gray-300 text-sm">
                  {pedido.itens && pedido.itens.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.produto_nome}</span>
                      <span>R$ {Number(item.subtotal || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total e botão de ação */}
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700">
                  <span className="text-white font-bold">Total:</span>
                  <span className="text-amber-400 font-bold text-lg">
                    R$ {Number(pedido.total).toFixed(2)}
                  </span>
                </div>

                {/* Botão para alterar status - Dentro do Card */}
                <div className="mt-3">
                  <select
                    value={pedido.status}
                    onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="pendente">📌 Pendente</option>
                    <option value="preparando">👨‍🍳 Preparando</option>
                    <option value="entregue">✅ Entregue</option>
                    <option value="cancelado">❌ Cancelado</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Exibir lista de pedidos */}
        {!carregando && !erro && pedidosFiltrados.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <span className="text-6xl mb-4 block">📦</span>
            <p className="text-gray-400 text-lg">Nenhum pedido encontrado</p>
            <p className="text-gray-500 text-sm mt-2">
              Aguardando novos pedidos dos clientes
            </p>
          </div>
        )}

        {!carregando && !erro && pedidos.length > 0 && pedidosFiltrados.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-gray-400 text-lg">Nenhum pedido encontrado com o ID {filtroId}</p>
            <button
              onClick={() => setFiltroId('')}
              className="mt-4 text-amber-400 hover:text-amber-300 transition-colors"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>
    </div>

  )
}

export { AdminPedidos }