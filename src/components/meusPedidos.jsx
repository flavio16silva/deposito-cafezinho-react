const MeusPedidos = () => {
  // Busca os pedidos salvos no localStorage
  const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]")

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

  return (
    <div className="min-h-screen bg-gray-900 pt-4">
      <div className="max-w-4xl mx-auto px-4 pb-8">

        {/* Título da página */}
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Meus Pedidos
        </h1>

        {/* Verifica se tem pedidos */}
        {pedidos.length === 0 ? (
          // Mensagem quando não há pedidos
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">Nenhum pedido encontrado</p>
            <p className="text-gray-500 text-sm mt-2">
              Faça seu primeiro pedido no cardápio!
            </p>
          </div>
        ) : (
          // Lista de pedidos
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
                  <div className="text-right">
                    <span className="text-green-400 text-sm font-bold">
                      {pedido.status || "Entregue"}
                    </span>
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
    </div>
  )
}

export { MeusPedidos }