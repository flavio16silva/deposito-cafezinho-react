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

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

// Componente para a página inicial
const Home = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
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
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export { App }