import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import { Navbar } from './components/navbar'



function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={
          <div className='min-h-screen bg-gray-50 p-8'>
            <div className='max-w-7xl mx-auto'>
              <h1 className='text-2xl font-bold text-gray-800'>
                Bem-vindo!</h1>
              <p className="text-gray-600">Cardápio em breve...</p>

            </div>
          </div>

        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App