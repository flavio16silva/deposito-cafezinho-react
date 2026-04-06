import { useState } from "react"
import { Link } from "react-router-dom"
import { CiBeerMugFull } from "react-icons/ci"
import { HiMenu, HiX } from "react-icons/hi"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: "/salgados", label: "Salgados" },
    { path: "/combos", label: "Combos" },
    { path: "/bebidas", label: "Bebidas" }
  ]

  return (
    <nav className="bg-gray-800 border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-800 p-3 rounded-md items-start gap-2">
              <CiBeerMugFull className="text-white text-3xl" />
              <div>
                <h1 className="font-logo text-2xl text-white">
                  Depósito Cafezinho
                </h1>
                <p className="font-sans text-sm text-white text-center">
                  desde 2010
                </p>
              </div>
            </div>
          </div>

          {/* Links Desktop - Centro */}
          <div className="hidden md:flex items-center justify-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Botão Hambúrguer - Direita (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <HiMenu className="text-3xl" />
          </button>

          {/* Overlay - aparece só quando menu aberto */}
          {/* {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          )} */}

          {/* MENU MOBILE - SEMPRE existe no DOM, apenas desliza */}
          <div className={`fixed top-0 right-0 h-full w-full bg-gray-800 shadow-2xl z-50 transform transition-transform duration-500 
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>

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
              <li>
                <Link to="/cardapio/salgados" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg">
                  Salgados
                </Link>
              </li>
              <li>
                <Link to="/cardapio/combos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg">
                  Combos
                </Link>
              </li>
              <li>
                <Link to="/cardapio/bebidas" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg">
                  Bebidas
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navbar }