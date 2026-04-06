import { Link } from "react-router-dom"
import { CiBeerMugFull } from "react-icons/ci"

const Navbar = () => {
  const navItems = [
    { path: "/", label: "inicio" },
    { path: "/sobre", label: "salgados" },
    { path: "/empresas", label: "combos" },
    { path: "/contato", label: "bebidas" }
  ]

  return (
    <nav className="bg-gray-800 border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row item-center justify-start gap-3">

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

          </div>


          {/* itens */}
          <div className="flex-1 flex items-center justify-center gap-2">
            <Link to="/cardapio/salgados" className="px-4 py-2 text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              Salgados
            </Link>

            <Link to="/cardapio/combos" className="px-4 py-2 text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              Combos
            </Link>

            <Link to="/cardapio/bebidas" className="px-4 py-2 text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              Bebidas
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navbar }