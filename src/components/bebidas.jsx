import { cervejas } from "../data/cervejas"
import { refri } from "../data/refrigerante"
import { Carrinho } from "./carrinho"

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

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-2xl md:max-w-4xl mx-auto pt-4">

        <div className="px-4 mb-8">
          <h1 className="text-2xl font-bold text-white text-center">
            Bebidas
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Refrigerantes e Cervejas
          </p>
        </div>

        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {todasBebidas.map(item => (
              <div key={item.id}>
                <div className="flex items-center justify-center gap-3">
                  {/* Coluna 1: Imagem */}
                  <div className="w-52 h-52">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={imagens[item.nome]}
                      alt={item.nome}
                    />
                  </div>
                  {/* Coluna 2: Nomes */}
                  <div className="flex-1">
                    <div className="text-white font-medium text-base">
                      {item.nome}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {item.unidade}
                    </div>
                  </div>
                  {/* Preços */}
                  <div className="text-right">
                    <div className="text-amber-400 font-bold text-base">
                      R$ {item.preco.toFixed(2)}
                    </div>
                  </div>
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

export { Bebidas }