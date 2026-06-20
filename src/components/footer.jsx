import { FaMapMarkerAlt, FaWhatsapp, FaClock, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-20">
      <div className="relative flex justify-center">
        <div className="relative -top-5 px-4">
          <h2 className="text-white font-bold text-lg bg-red-600 rounded-full py-2 px-6 inline-block">
            Depósito Boa Prosa
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-6">
        {/* Slogan centralizado */}
        <p className="text-gray-400 text-lg text-center font-bold">
          O melhor petisco da cidade. Faça já o seu pedido.
        </p>

        {/* Endereço */}
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-white text-sm" />
            <p className="text-gray-400 text-sm font-bold">Av. Princesa Isabel, 7. Barra </p>
          </div>

          {/* Horário de funcionamento */}
          <div className="flex items-center gap-2">
            <FaClock className="text-white text-sm" />
            <p className="text-gray-400 text-sm font-bold"> Horários: 8h às 18h - Todos os dias.</p>
          </div>

          {/* Telefone */}
          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-white text-sm" />
            <p className="text-gray-400 text-sm font-bold">(71) 99609-8690</p>
          </div>
        </div>

        {/* Direitos autorais centralizado */}
        <p className="text-gray-500 text-xs text-center mt-6 pt-3 ">
          2026. Todos os direitos reservados. Criado por Flávio Silva
          <a
            href="https://www.linkedin.com/in/flavio-leite-silva/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block ml-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaLinkedin className="inline-block text-sm" />
          </a>
        </p>

      </div>
    </footer>
  )
}

export { Footer }