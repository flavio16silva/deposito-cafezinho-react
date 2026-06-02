import { useState } from 'react'

const AdminGuard = ({ children }) => {

  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [autorizado, setAutorizado] = useState(false)

  const SENHA_ADMIN = import.meta.env.VITE_ADMIN_SENHA

  const handleSubmit = (e) => {
    e.preventDefault()

    if (senha === SENHA_ADMIN) {
      setAutorizado(true)
      setErro('')
    } else {
      setErro('Senha incorreta')
      setSenha('')
    }
  }

  if (autorizado) {
    return children
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          🔐 Acesso Restrito
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Digite a senha do administrador
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white mb-4 focus:outline-none focus:border-amber-500"
            autoFocus
          />

          {erro && (
            <p className="text-red-500 text-sm mb-4 text-center">{erro}</p>
          )}

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors font-medium"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export { AdminGuard }