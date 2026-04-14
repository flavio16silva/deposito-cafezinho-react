import { useContext } from "react"
import { CarrinhoContext } from "../context/carrinhoContext"


const Carrinho = () => {
  // Pega os dados do contexto
  const { itens, setItens, remover, aumentar, diminuir, total } = useContext(CarrinhoContext)

  if (itens.length === 0) {
    return (
      <div className="bg-amber-900 rounded-lg p-4 text-center justify-center items-center w-96">
        <p className="text-gray-200 font-bold">🛒 Carrinho vazio</p>
      </div>
    )
  }

  // Finalizar o pedido
  const finalizarPedido = () => {
    if (itens.length === 0) {
      alert("Carrinho vazio! Adicione itens antes de finalizar.")
      return
    }

    // Pega a lista de pedidos já salvos
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos") || "[]")

    // Cria um novo pedido com data atual
    const novoPedido = {
      id: Date.now(),  //data em milissegundos
      data: new Date().toISOString(),
      itens: [...itens],
      total: total,
      status: "Entregue"
    }

    // Adiciona o novo pedido à lista
    pedidosSalvos.push(novoPedido)

    // Salva no localStorage
    localStorage.setItem("pedidos", JSON.stringify(pedidosSalvos))

    // Limpa o carrinho
    setItens([])

    // Mensagem de sucesso
    alert("Pedido finalizado com sucesso!")
  }

  return (
    <div className="bg-gray-800 rounded-lg p-2 sm:p-4">

      {itens.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b border-gray-700 py-1 sm:py-2">
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm sm:text-base wrap-break-words">{item.nome}</p>
            {/* <p className="text-gray-400 text-xs">{item.unidades * item.quantidade} und</p> */}
          </div>

          <div className="flex items-center gap-1 sm:gap-4 w-auto justify-start sm:justify-center">
            <button
              onClick={() => diminuir(item.id)}
              className="bg-amber-500 text-white font-bold w-8 h-6 rounded text-lg">
              -
            </button>
            <span className="text-white text-sm w-8 text-center">{item.quantidade}</span>
            <button
              onClick={() => aumentar(item.id)}
              className="bg-amber-500 text-white w-8 h-6 rounded text-lg">
              +
            </button>
          </div>

          <div className="text-right ml-2 min-w-20 text-xs sm:text-sm">
            <p className="text-amber-400 font-bold text-sm sm:text-base ">R$ {item.total.toFixed(2)}</p>
            <button onClick={() => remover(item.id)} className="text-red-400 text-xs">Remover</button>
          </div>
        </div>
      ))}


      <div className="flex justify-between mt-2 text-xs sm:text-sm">
        <span className="text-white text-lg">Total:</span>
        <span className="text-amber-400 font-bold">R$ {total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => setItens([])}
        className="ml-auto mt-3 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 w-auto text-xs sm:text-sm"
      >
        🗑️ Limpar Carrinho
      </button>

      <button
        onClick={finalizarPedido}
        className="ml-auto mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-bold flex items-center justify-center gap-2 w-auto text-xs sm:text-sm"
      >
        ✅ Finalizar Pedido
      </button>

    </div>
  )
}

export { Carrinho }