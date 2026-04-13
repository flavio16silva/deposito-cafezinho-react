import { FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-20">
      <div className="relative flex justify-center">
        <div className="relative -top-5 px-4">
          <h2 className="text-white font-bold text-lg bg-red-600 rounded-full py-2 px-6 inline-block">
            Depósito Cafezinho
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-6">
        {/* Slogan centralizado */}
        <p className="text-gray-400 text-sm text-center">
          O melhor salgado da cidade.
        </p>

        {/* Endereço */}
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-white text-sm" />
            <p className="text-gray-400 text-sm">Eng. Velho da Federação</p>
          </div>

          {/* Horário de funcionamento */}
          <div className="flex items-center gap-2">
            <FaClock className="text-white text-sm" />
            <p className="text-gray-400 text-sm"> Horário de funcionamento: 8h às 18h</p>
          </div>

          {/* Telefone */}
          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-white text-sm" />
            <p className="text-gray-400 text-sm">(71) 99346-2490</p>
          </div>
        </div>

        {/* Direitos autorais centralizado */}
        <p className="text-gray-500 text-xs text-center mt-6 pt-3 ">
          2026. Todos os direitos reservados. Criado por Flávio Silva
        </p>

      </div>
    </footer>
  )
}

export { Footer }