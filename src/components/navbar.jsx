import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { CiBeerMugFull } from "react-icons/ci"
import { HiMenu, HiX } from "react-icons/hi"
import { BiUser } from "react-icons/bi"
import { useContext } from "react"
import { Carrinho } from "./carrinho"
import { CarrinhoContext } from "../context/carrinhoContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false)
  const [isPerfilOpen, setIsPerfilOpen] = useState(false)

  const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}')

  const navItems = [
    { path: "/salgados", label: "Salgados" },
    { path: "/combos", label: "Combos" },
    { path: "/bebidas", label: "Bebidas" },
    { path: "/meusPedidos", label: "Meus Pedidos" }
  ]

  const { itens } = useContext(CarrinhoContext)

  //Encontra-se ativo
  const linkClass = ({ isActive }) =>
    isActive ? "text-amber-400" : "text-white hover:text-amber-400 transition-colors"

  // Função para deslogar o usuário
  const handleLogout = () => {
    localStorage.removeItem('logado')
    localStorage.removeItem('usuarioLogado')
    window.location.href = '/login'
  }


  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 py-3">

          <div className="flex flex-col">

            {/* Layout: Hamburguer | Logo | Carrinho */}
            <div className="flex items-center justify-around  md:justify-between gap-12">

              {/* ESQUERDA: Botão Hamburguer (Mobile) */}
              <button
                onClick={() => {
                  setIsCarrinhoOpen(false)
                  setIsMenuOpen(true)
                }}
                className=" md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <HiMenu className="text-3xl" />
              </button>

              {/* CENTRO: Logo */}
              <Link to="/salgados"
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsCarrinhoOpen(false)
                }}
                className="flex items-center gap-0">
                <CiBeerMugFull className="text-white text-3xl sm:text-xl md:text-2xl shrink-0" />
                <div className="text-center">
                  <h1 className="font-logo text-lg sm:text-4xl md:text-3xl text-white ">
                    Depósito Cafezinho
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-gray-300 whitespace-nowrap text-center">
                    desde 2024
                  </p>
                </div>
              </Link>

              {/* DIREITA: Ícone Perfil + Carrinho */}
              <div className="flex items-center gap-4">

                {/* Ícone do Perfil (só aparece se usuário estiver logado) */}
                {usuario?.nome && (
                  <div className="relative">
                    <button
                      onClick={() => setIsPerfilOpen(!isPerfilOpen)}
                      className=" flex items-center text-white text-3xl hover:text-amber-400 transition-colors"
                    >
                      <BiUser />
                    </button>

                    {/* Dropdown do Perfil */}
                    {isPerfilOpen && (
                      <>
                        {/* Fundo escuro para fechar ao clicar fora */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsPerfilOpen(false)}
                        />

                        {/* Menu do perfil */}
                        {/* Só mostra se usuário logado */}
                        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700">
                          <div className="p-4 border-b border-gray-700">
                            <p className="text-white font-bold">{usuario?.nome}</p>
                            <p className="text-gray-400 text-sm">{usuario?.telefone}</p>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 rounded-b-lg transition-colors"
                          >
                            Sair
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Carrinho */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsCarrinhoOpen(true)
                    }}
                    className="text-white text-3xl hover:text-amber-400 transition-colors"
                  >
                    🛒
                  </button>
                  {itens.length > 0 && (
                    <span className="absolute -top-1 right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itens.length} {/*mostra o número de itens*/}
                    </span>
                  )}
                </div>

              </div>

            </div>

            {/* LINKS DESKTOP  */}
            <div className="hidden md:flex justify-center gap-6 mt-2">

              <NavLink to="/salgados"
                className={linkClass}>
                Salgados
              </NavLink>

              <NavLink
                to="/combos"
                className={linkClass}>
                Combos
              </NavLink>

              <NavLink
                to="/bebidas"
                className={linkClass}>
                Bebidas
              </NavLink>

              <NavLink
                to="/meusPedidos"
                className={linkClass}>
                Meus Pedidos
              </NavLink>

            </div>

          </div>
        </div>

        {/* MENU MOBILE */}
        <div className={`fixed top-0 left-0 h-full w-2/3 bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>

          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <span className="text-white font-bold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-1 rounded-lg hover:bg-gray-700"
            >
              <HiX className="text-2xl" />
            </button>
          </div>

          {/* Só mostra botão se usuário logado */}
          {usuario?.nome && (
            <li className="list-none border-b border-gray-700 p-4 space-y-3 pb-3 mb-2">
              <div className="px-4 py-3">
                <p className="text-white font-bold">{usuario.nome}</p>
                <p className="text-gray-400 text-sm">{usuario.telefone}</p>
              </div>
            </li>
          )}

          <ul className="flex flex-col p-4 space-y-3">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Botão Sair */}
            {usuario?.nome && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav >

      {/* MODAL DO CARRINHO */}
      < div className={`fixed top-0 right-0 h-full w-80 sm:w-3/4 lg:w-2/5 bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
      ${isCarrinhoOpen ? "translate-x-0" : "translate-x-full"}`
      }>

        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-white font-bold text-lg">🛒 Carrinho</span>
          <button
            onClick={() => setIsCarrinhoOpen(false)}
            className="text-white text-2xl hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* CONTEÚDO CONDICIONAL */}
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {itens.length === 0 ? (
            // Carrinho vazio
            <div className="flex flex-col items-center justify-center h-64">
              <span className="text-6xl mb-4">😢</span>
              <p className="text-gray-300 text-lg">Seu carrinho tá vazio</p>
              <p className="text-gray-500 text-sm mt-2">Adicione itens para continuar</p>
            </div>
          ) : (
            // Carrinho com itens
            <Carrinho />
          )}
        </div>

      </div >
    </>
  )
}

export { Navbar }