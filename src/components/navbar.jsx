import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { CiBeerMugFull } from "react-icons/ci"
import { HiMenu, HiX } from "react-icons/hi"
import { useContext } from "react"
import { Carrinho } from "./carrinho"
import { CarrinhoContext } from "../context/carrinhoContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false)

  const navItems = [
    { path: "/salgados", label: "Salgados" },
    { path: "/combos", label: "Combos" },
    { path: "/bebidas", label: "Bebidas" },
    { path: "/meusPedidos", label: "Meus Pedidos" }
  ]

  const { itens } = useContext(CarrinhoContext)

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 py-3">

          <div className="flex flex-col">

            {/* Layout: Hamburguer | Logo | Carrinho */}
            <div className="flex items-center justify-around  md:justify-between gap-12">

              {/* ESQUERDA: Botão Hamburguer (Mobile) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className=" md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <HiMenu className="text-3xl" />
              </button>

              {/* CENTRO: Logo */}
              <div className="flex items-start gap-1 ">
                <CiBeerMugFull className="text-white text-3xl text-center items-start" />
                <div className="text-center">
                  <h1 className="font-logo text-xl md:text-2xl text-white">
                    Depósito Cafezinho
                  </h1>
                  <p className="font-sans text-xs md:text-sm text-gray-300">
                    desde 2010
                  </p>
                </div>
              </div>

              {/* DIREITA: Carrinho (ícone) */}
              <div className=" relative w-10 h-10 flex items-center justify-center">
                <button
                  onClick={() => setIsCarrinhoOpen(true)}
                  className="text-white text-4xl hover:text-amber-400 transition-colors">
                  🛒
                </button>
                {/* Contador: Carrinho */}
                {itens.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itens.length}
                  </span>
                )}
              </div>

            </div>

            {/* LINKS DESKTOP  */}
            <div className="hidden md:flex justify-center gap-6 mt-2">

              <NavLink
                to="/salgados"
                className={({ isActive }) =>
                  isActive ? "text-amber-400" : "text-white hover:text-amber-400 transition-colors"
                }
              >
                Salgados
              </NavLink>

              <NavLink
                to="/combos"
                className={({ isActive }) =>
                  isActive ? "text-amber-400" : "text-white hover:text-amber-400 transition-colors"
                }
              >
                Combos
              </NavLink>

              <NavLink
                to="/bebidas"
                className={({ isActive }) =>
                  isActive ? "text-amber-400" : "text-white hover:text-amber-400 transition-colors"
                }
              >
                Bebidas
              </NavLink>

              <NavLink
                to="/meusPedidos"
                className={({ isActive }) =>
                  isActive ? "text-amber-400" : "text-white hover:text-amber-400 transition-colors"
                }
              >
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
          </ul>
        </div>
      </nav>

      {/* MODAL DO CARRINHO */}
      <div className={`fixed top-0 right-0 h-full w-full bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
      ${isCarrinhoOpen ? "translate-x-0" : "translate-x-full"}`}>

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

      </div>
    </>
  )
}

export { Navbar }