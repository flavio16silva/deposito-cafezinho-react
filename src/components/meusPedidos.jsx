import { Link } from "react-router-dom"
import { useState } from "react"
import { ConfirmModal } from "./confirmModal"
import { toast } from 'react-toastify'

const MeusPedidos = () => {
  // Busca o usuário logado
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}')
  const chavePedidos = `pedidos_${usuario.telefone}`

  //Modal Excluir Pedidos
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState(null)

  // Busca os pedidos deste usuário
  const [pedidos, setPedidos] = useState(() => {
    return JSON.parse(localStorage.getItem(chavePedidos) || "[]")
  })

  // Função para formatar a data
  const formatarData = (dataISO) => {
    const data = new Date(dataISO)
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  // Função para excluir um pedido específico
  const excluirPedido = (id) => {
    setPedidoParaExcluir(id)
  }

  // Função para excluir todos os pedidos
  const excluirTodosPedidos = () => {
    setShowConfirmModal(true)
  }

  const confirmarExclusaoTodos = () => {
    setPedidos([])
    localStorage.setItem(chavePedidos, JSON.stringify([]))
    toast.success("🗑️ Todos os pedidos foram excluídos!")
    setShowConfirmModal(false)
  }

  const confirmarExclusaoIndividual = () => {
    const novosPedidos = pedidos.filter(pedido => pedido.id !== pedidoParaExcluir)
    setPedidos(novosPedidos)
    localStorage.setItem(chavePedidos, JSON.stringify(novosPedidos))
    toast.info("📦 Pedido removido do histórico!")
    setPedidoParaExcluir(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-4">
      <div className="max-w-4xl mx-auto px-4 pb-8">

        {/* Título da página */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Meus Pedidos
          </h1>

          {/* Botão excluir todos */}
          {pedidos.length > 0 && (
            <button
              onClick={excluirTodosPedidos}
              className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              🗑️ Excluir Todos
            </button>
          )}
        </div>

        {/* Botão para voltar ao cardápio */}
        <div className="mb-6">
          <Link
            to="/salgados"
            className="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            ← Voltar ao Cardápio
          </Link>
        </div>

        {/* Verifica se tem pedidos */}
        {pedidos.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">Nenhum pedido encontrado</p>
            <p className="text-gray-500 text-sm mt-2">
              Faça seu primeiro pedido no cardápio!
            </p>
            <Link
              to="/salgados"
              className="inline-block mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Fazer Pedido
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-gray-800 rounded-lg p-4">

                {/* Cabeçalho do pedido */}
                <div className="flex justify-between items-start border-b border-gray-700 pb-2 mb-2">
                  <div>
                    <p className="text-gray-400 text-xs">
                      Pedido #{pedido.id}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatarData(pedido.data)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 text-sm font-bold">
                      {pedido.status || "Entregue"}
                    </span>
                    {/* Botão excluir este pedido */}
                    <button
                      onClick={() => excluirPedido(pedido.id)}
                      className="text-red-400 text-xs hover:text-red-300 transition-colors"
                      title="Excluir pedido"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Itens do pedido */}
                <div className="space-y-2">
                  {pedido.itens.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-sm">{item.nome}</p>
                        <p className="text-gray-400 text-xs">
                          {item.quantidade} und
                        </p>
                      </div>
                      <p className="text-amber-400 font-bold text-sm">
                        R$ {item.total.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total do pedido */}
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-amber-400 font-bold text-lg">
                    R$ {pedido.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      {/* Modal de confirmação - Excluir Todos */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmarExclusaoTodos}
        title="Excluir todos os pedidos:"
        message="Tem certeza que deseja excluir TODOS os pedidos? Esta ação não pode ser desfeita."
      />

      {/* Modal de confirmação - Excluir Pedido Individual */}
      <ConfirmModal
        isOpen={pedidoParaExcluir !== null}
        onClose={() => setPedidoParaExcluir(null)}
        onConfirm={confirmarExclusaoIndividual}
        title="Excluir pedido:"
        message="Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita."
      />
    </div>
  )
}

export { MeusPedidos }