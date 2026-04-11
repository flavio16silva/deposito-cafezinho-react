import { useContext } from "react"
import { CarrinhoContext } from "../context/carrinhoContext"

const Carrinho = () => {
  // Pega os dados do contexto
  const { itens, remover, aumentar, diminuir, total } = useContext(CarrinhoContext)

  if (itens.length === 0) {
    return (
      <div className="bg-amber-900 rounded-lg p-4 text-center justify-center items-center w-96">
        <p className="text-gray-200 font-bold">🛒 Carrinho vazio</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      {/* <h2 className="text-white font-bold mb-3">🛒 Carrinho</h2> */}

      {itens.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b border-gray-700 py-2">
          <div className="flex-1">
            <p className="text-white text-lg">{item.nome}</p>
            <p className="text-gray-400 text-xs">{item.quantidade} und</p>
          </div>

          <div className="flex items-center gap-6 w-36 justify-center">
            <button
              onClick={() => diminuir(item.id)}
              className="bg-amber-500 text-white font-bold w-28 h-6 rounded text-lg">
              -
            </button>
            <span className="text-white text-sm w-8 text-center">{item.quantidade}</span>
            <button
              onClick={() => aumentar(item.id)}
              className="bg-amber-500 text-white w-28 h-6 rounded text-lg">
              +
            </button>
          </div>

          <div className="text-right ml-12 w-28">
            <p className="text-amber-400 font-bold">R$ {item.total.toFixed(2)}</p>
            <button onClick={() => remover(item.id)} className="text-red-400 text-xs">Remover</button>
          </div>
        </div>
      ))}

      {/* <div className="mt-3 pt-2 border-t border-gray-700"> */}
      <div className="flex justify-between mt-2">
        <span className="text-white text-lg">Total:</span>
        <span className="text-amber-400 font-bold">R$ {total.toFixed(2)}</span>
      </div>
      {/* </div> */}
    </div>
  )
}

export { Carrinho }