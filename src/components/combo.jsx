import { combos } from '../data/combos'

const imagens = {
  // Salgados
  "Pastel de carne": "/pastel.png",
  "Pastel de Pizza": "/pastelPizza.png",
  "Bolinha queijo": "/bolinhoQueijo.png",
  "Coxinha": "/coxinhaFrango.png",
  "Kibe": "/quibe.png",
  "Sortidos": "/salgadosSortidos.png",

  // Cervejas
  "Amstel Ultra": "/cerveja/amstel.png",
  "Budweiser": "/cerveja/budweiser.png",
  "Heineken": "/cerveja/heineken.png",
  "Império Ultra": "/cerveja/imperio.png",
  "Stella Artois": "/cerveja/stella.png"
}

const Combos = () => {
  const separarNome = (nomeCompleto) => {
    const partes = nomeCompleto.split(" + 6 ")
    return {
      salgado: partes[0],
      cerveja: partes[1]
    }
  }
  // { console.log(separarNome(combos[0].nome)) }
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-2xl md:max-w-4xl mx-auto pt-4">

        {/* Título */}
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold text-white text-center">
            🍺 Combos
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Salgado + Cerveja
          </p>
        </div>

        {/* Grade dos Produtos */}
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {combos.map(item => {
              const { salgado, cerveja } = separarNome(item.nome)
              return (
                <div key={item.id} className='text-center'>

                  <h3 className='text-white font-bold text-sm'>
                    {salgado} <br />
                    <span className='text-amber-400'>+ 6 {cerveja}</span>
                  </h3>
                  <div className='p-2'>
                    <div className='mt-0'>
                      {/*2 Imagens lado a lado*/}
                      <div className='flex justify-center gap-2'>

                        {/* Imagens do Salgado */}
                        <div className="w-52 h-52 md:w-36 md:h-36">
                          <img
                            className='w-full h-full object-cover rounded-xl'
                            src={imagens[salgado]}
                            alt={salgado}
                          />
                        </div>

                        {/* Imagem da cerveja */}
                        <div className="w-52 h-52 md:w-36 md:h-36">
                          <img
                            className="w-full h-full object-cover bg-white rounded-xl"
                            src={imagens[cerveja]}
                            alt={cerveja}
                          />
                        </div>

                      </div>
                      {/* Preços - igual aos salgados */}
                      <div className="space-y-0 md:space-y-1 py-0 md:py-1 mt-2">
                        <div className="flex justify-center gap-4">
                          <span className="text-gray-400 text-sm">10 unidades</span>
                          <span className="text-amber-400 font-bold">R$ {item.preco10.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-center gap-4">
                          <span className="text-gray-400 text-sm">20 unidades</span>
                          <span className="text-amber-400 font-bold">R$ {item.preco20.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-center gap-4">
                          <span className="text-gray-400 text-sm">30 unidades</span>
                          <span className="text-amber-400 font-bold">R$ {item.preco30.toFixed(2)}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div >
  )
}

export { Combos }