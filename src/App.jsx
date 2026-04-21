import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet
} from 'react-router-dom'

import { Login } from './components/login'
import { Navbar } from './components/navbar'
import { Salgados } from './components/salgados'
import { Combos } from './components/combo'
import { Bebidas } from './components/bebidas'
import { Footer } from './components/footer'
import { MeusPedidos } from './components/meusPedidos'
import { Cadastro } from './components/cadastro'

const Layout = () => {
  return (
    <div className='flex flex-col bg-gray-900 overflow-x-hidden'>
      <Navbar />
      <main className='flex-1 w-full max-w-full px-4 sm:px-6 md:px-8'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const LayoutSimples = () => {
  return (
    <div className='min-h-screen bg-gray-900 overflow-x-hidden px-4 sm:px-6 md:px-8'>
      <Outlet />
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
      <>
        <Route path="/" element={<LayoutSimples />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>

        <Route path="/" element={< Layout />}>
          <Route path="/salgados" element={<Salgados />} />
          <Route path="/combos" element={<Combos />} />
          <Route path="/bebidas" element={<Bebidas />} />
          <Route path="/meusPedidos" element={<MeusPedidos />} />
        </Route>

      </>
    )
  )

  return <RouterProvider router={router} />
}

export { App }