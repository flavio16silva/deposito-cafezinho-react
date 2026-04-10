import { salgadinhos } from "../data/salgadinhos"
import { Carrinho } from "./carrinho"
import { useContext } from "react"
import { CarrinhoContext } from "../context/carrinhoContext"

const Salgados = () => {
  const imagens = {
    "Pastel de carne": "/pastel.png",
    "Pastel de pizza": "/pastelPizza.png",
    "Bolinha de queijo": "/bolinhoQueijo.png",
    "Coxinha de frango": "/coxinhaFrango.png",
    "Kibe com queijo": "/quibe.png",
    "Salgadinhos sortidos": "/salgadosSortidos.png"
  }

  const { adicionar } = useContext(CarrinhoContext)

  return (
    <div className="min-h-screen bg-gray-900">

      <div className="max-w-2xl md:max-w-4xl mx-auto pt-4">

        {/* Titulo */}
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Salgadinhos
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Escolha seu salgado favorito
          </p>
        </div>

        {/* Grade dos Produtos */}
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salgadinhos.map(item => (
              <div key={item.id} className="text-center">
                <h3 className="text-white font-bold text-base">{item.nome}</h3>
                <div className="p-4">

                  <div className="mt-0 space-y-1">
                    <div className="flex justify-center items-center gap-2 md:gap-2">
                      <div className="w-24 h-24 md:w-32 md:h-32">
                        <img className="w-full h-full object-cover rounded-lg" src={imagens[item.nome]} alt="" />
                      </div>

                      <div className="space-y-0 md:space-y-1 py-0 md:py-1">
                        <div className="flex justify-center items-center gap-4">
                          <div className="text-gray-400 text-sm">10 unidades</div>
                          <div className="text-amber-400 font-bold">R$ {item.preco10.toFixed(2)}</div>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                          <div className="text-gray-400 text-sm">20 unidades</div>
                          <div className="text-amber-400 font-bold">R$ {item.preco20.toFixed(2)}</div>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                          <div className="text-gray-400 text-sm">30 unidades</div>
                          <div className="text-amber-400 font-bold">R$ {item.preco30.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => adicionar({
                      id: item.id,
                      nome: item.nome,
                      quantidade: 1,
                      precoUnitario: item.preco10 / 10,
                      total: item.preco10
                    })}
                    className="bg-amber-500 text-white px-4 py-1 rounded hover:bg-amber-400"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 px-4">
          <Carrinho />
        </div>
      </div>
    </div>
  )
}

export { Salgados }