import { salgadinhos } from "../data/salgadinhos"
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
    <div className="bg-gray-900">

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

                {/* Nome do produto */}
                <h3 className="text-white font-bold text-base">{item.nome}</h3>

                {/* Imagem */}
                <div className="flex justify-center mt-2">
                  <div className="w-32 h-32">
                    <img className="w-full h-full object-cover rounded-lg" src={imagens[item.nome]} alt="" />
                  </div>
                </div>

                {/* Preços com botões */}
                <div className="space-y-2 mt-4">

                  {/* 10 unidades */}
                  <div className="flex justify-between items-center gap-2 px-4 max-w-xs mx-auto">
                    <span className="text-gray-400 text-sm whitespace-nowrap">10 unidades</span>
                    <span className="text-amber-400 font-bold text-sm whitespace-nowrap">R$ {item.preco10.toFixed(2)}</span>
                    <button
                      onClick={() => adicionar({
                        id: `${item.id}-10`,
                        nome: `${item.nome} (10 und)`,
                        unidades: 10,
                        quantidade: 1,
                        precoUnitario: item.preco10 / 10,
                        total: item.preco10
                      })}
                      className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-400 whitespace-nowrap"
                    >
                      +
                    </button>
                  </div>

                  {/* 20 unidades */}
                  <div className="flex justify-between items-center gap-2 px-4 max-w-xs mx-auto">
                    <span className="text-gray-400 text-sm whitespace-nowrap">20 unidades</span>
                    <span className="text-amber-400 font-bold text-sm whitespace-nowrap">R$ {item.preco20.toFixed(2)}</span>
                    <button
                      onClick={() => adicionar({
                        id: `${item.id}-20`,
                        nome: `${item.nome} (20 und)`,
                        unidades: 20,
                        quantidade: 1,
                        precoUnitario: item.preco20 / 20,
                        total: item.preco20
                      })}
                      className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-400 whitespace-nowrap"
                    >
                      +
                    </button>
                  </div>

                  {/* 30 unidades */}
                  <div className="flex justify-between items-center gap-2 px-4 max-w-xs mx-auto">
                    <span className="text-gray-400 text-sm whitespace-nowrap">30 unidades</span>
                    <span className="text-amber-400 font-bold text-sm whitespace-nowrap">R$ {item.preco30.toFixed(2)}</span>
                    <button
                      onClick={() => adicionar({
                        id: `${item.id}-30`,
                        nome: `${item.nome} (30 und)`,
                        unidades: 30,
                        quantidade: 1,
                        precoUnitario: item.preco30 / 30,
                        total: item.preco30
                      })}
                      className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-400 whitespace-nowrap"
                    >
                      +
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Salgados }