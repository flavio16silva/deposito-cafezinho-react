import { cervejas } from "../data/cervejas"
import { refri } from "../data/refrigerante"
import { useContext } from "react"
import { CarrinhoContext } from "../context/carrinhoContext"

const Bebidas = () => {
  const todasBebidas = [...refri, ...cervejas]

  const imagens = {
    // Refrigerantes
    "Guaraná Antártica 1L": "/refrigerante/guarana.png",
    "Pepsi 1L": "/refrigerante/pepsi.png",
    "Coca Cola 1L": "/refrigerante/coca.png",
    "Goob 1L": "/refrigerante/goob.png",

    // Cervejas
    "Amstel Ultra": "/cerveja/amstel.png",
    "Heineken": "/cerveja/heineken.png",
    "Stella Artois": "/cerveja/stella.png",
    "Budweiser": "/cerveja/budweiser.png",
    "Império Ultra": "/cerveja/imperio.png"
  }

  const { adicionar } = useContext(CarrinhoContext)

  return (
    <div className="bg-gray-900">
      <div className="max-w-4xl mx-auto pt-4">

        <div className="px-4 mb-8">
          <h1 className="text-2xl font-bold text-white text-center">
            Bebidas
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Refrigerantes e Cervejas
          </p>
        </div>

        <div className="px-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            {todasBebidas.map(item => (
              <div key={item.id}>
                <div className="flex items-center gap-6">
                  {/* Coluna 1: Imagem */}
                  <div className="w-32 h-32">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={imagens[item.nome]}
                      alt={item.nome}
                    />
                  </div>
                  {/* Coluna 2: Nomes */}
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-base wrap-break-words">
                      {item.nome}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {item.unidade}
                    </div>
                  </div>
                  {/* Preços */}
                  <div className="text-right">
                    <div className="text-amber-400 font-bold text-base mt-1">
                      R$ {item.preco.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => adicionar({
                      id: item.id,
                      nome: item.nome,
                      unidades: 1,
                      quantidade: 1,
                      precoUnitario: item.preco,
                      total: item.preco
                    })}
                    className="bg-amber-500 text-white px-4 py-1 rounded text-sm hover:bg-amber-400 mt-2"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export { Bebidas }