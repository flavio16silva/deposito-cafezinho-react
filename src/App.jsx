import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet
} from 'react-router-dom'

import { Navbar } from './components/navbar'
import { Salgados } from './components/salgados'
import { Combos } from './components/combo'
import { Bebidas } from './components/bebidas'
import { Footer } from './components/footer'
import { MeusPedidos } from './components/meusPedidos'
import { Cadastro } from './components/cadastro'

const Layout = () => {
  return (
    <div className='flex flex-col bg-gray-900'>
      <Navbar />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

// Componente para a página inicial
const Home = () => {
  return (
    <div className='bg-gray-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold text-gray-800'>
          Bem-vindo!
        </h1>
        <p className="text-gray-600">Cardápio em breve...</p>
      </div>
    </div>
  )
}

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={< Layout />}>
        <Route index element={<Home />} />
        <Route path="/salgados" element={<Salgados />} />
        <Route path="/combos" element={<Combos />} />
        <Route path="/bebidas" element={<Bebidas />} />
        <Route path="/meusPedidos" element={<MeusPedidos />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export { App }