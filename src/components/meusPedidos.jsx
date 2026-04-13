import { CarrinhoContext } from "../context/carrinhoContext"

const MeusPedidos = () => {
  const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]")

  return (
    <div className="min-h-screen bg-gray-900 pt-4">
      <div className="max-w-4xl mx-auto px-4">

        {/* Titulo da Pagina */}
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
          //Lista de Pedidos
          <div className="space-y-4">
            {pedidos.map((pedido, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-bold">{pedido.nome}</p>
                    <p className="text-gray-400 text-sm">
                      Quantidade: {pedido.quantidade} und
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-bold">
                      R$ {pedido.total.toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(pedido.data).toLocaleDateString()}
                    </p>
                  </div>
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