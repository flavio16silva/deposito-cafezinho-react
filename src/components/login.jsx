// Importa os hooks necessários
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import { CarrinhoContext } from '../context/carrinhoContext'
import { toast } from 'react-toastify'

const Login = () => {
  // Estados para armazenar os dados do formulário
  const [celular, setCelular] = useState('')
  const [senha, setSenha] = useState('')

  // const { adicionar } = useContext(CarrinhoContext)

  // Estados para controlar o foco dos campos (placeholder sobe)
  const [focoCelular, setFocoCelular] = useState(false)
  const [focoSenha, setFocoSenha] = useState(false)

  // Hook para navegação (redirecionar após login)
  const navigate = useNavigate()

  // Função para aplicar máscara de celular
  const mascaraCelular = (valor) => {
    const numeros = valor.replace(/\D/g, '')

    let celularFormatado = ''
    if (numeros.length <= 2) {
      celularFormatado = numeros
    } else if (numeros.length <= 3) {
      celularFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
    } else if (numeros.length <= 7) {
      celularFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)}${numeros.slice(3)}`
    } else {
      celularFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)}${numeros.slice(3, 7)}-${numeros.slice(7, 11)}`
    }

    return celularFormatado
  }

  // ============================================================
  // FUNÇÃO PARA PROCESSAR O LOGIN (CHAMANDO O BACKEND)
  // ============================================================
  const handleLogin = async () => {
    // Verifica se os campos estão preenchidos
    if (!celular || !senha) {
      toast.warning('Preencha todos os campos')
      return
    }

    try {
      console.log('Enviando:', { telefone: celular, senha: senha })
      // 1. Chamar o backend
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          telefone: celular,
          senha: senha
        })
      })

      const data = await response.json()

      // 2. Verificar se deu certo
      if (!response.ok) {
        toast.error(data.erro || 'Erro ao fazer login')
        return
      }

      // 3. Login bem-sucedido
      toast.success(data.mensagem)

      // 4. Salvar usuário logado
      const usuarioLogado = {
        id: data.usuario.id,
        nome: data.usuario.nome,
        email: data.usuario.email,
        telefone: data.usuario.telefone,
        role: data.usuario.role
      }
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
      localStorage.setItem('logado', 'true')

      // 5. Se for admin, salvar também no localStorage do admin
      if (data.usuario.role === 'admin') {
        localStorage.setItem('admin_logado', 'true')
      }

      // 6. Redirecionar para o cardápio
      navigate('/salgados')

    } catch (error) {
      console.error('Erro no login:', error)
      toast.error('Erro ao conectar com o servidor')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo/Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">🍻 Depósito</h1>
          <h2 className="text-2xl font-bold text-amber-400">Cafezinho</h2>
          <p className="text-gray-400 text-sm mt-2">Faça seu login</p>
        </div>

        <div className="backdrop-blur-md rounded-2xl p-8 
                border border-gray-600 shadow-lg
                hover:border-amber-400 
                focus-within:border-amber-400 focus-within:shadow-amber-400/20
                transition-all duration-300">

          {/* Formulário */}
          <div className="space-y-6">

            {/* Campo Celular */}
            <div className="relative">
              <label
                htmlFor="celular"
                className={`absolute left-3 transition-all duration-200 pointer-events-none
                ${focoCelular || celular
                    ? 'text-xs -top-2 text-amber-400 bg-gray-900 px-1'
                    : 'text-base top-3 text-gray-400'
                  }`}
              >
                Celular
              </label>
              <input
                id="celular"
                type="tel"
                value={celular}
                onChange={(e) => setCelular(mascaraCelular(e.target.value))}
                onFocus={() => setFocoCelular(true)}
                onBlur={() => setFocoCelular(false)}
                className="w-full bg-transparent border border-gray-600 rounded-lg py-3 px-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
                placeholder=" "
              />
            </div>

            {/* Campo Senha */}
            <div className="relative">
              <label
                htmlFor="senha"
                className={`absolute left-3 transition-all duration-200 pointer-events-none
                ${focoSenha || senha
                    ? 'text-xs -top-2 text-amber-400 bg-gray-900 px-1'
                    : 'text-base top-3 text-gray-400'
                  }`}
              >
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onFocus={() => setFocoSenha(true)}
                onBlur={() => setFocoSenha(false)}
                className="w-full bg-transparent border border-gray-600 rounded-lg py-3 px-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
                placeholder=" "
              />
            </div>

            {/* Botão Entrar */}
            <button
              onClick={handleLogin}
              disabled={!celular || !senha}
              className={`w-full py-3 rounded-lg font-bold transition-colors
              ${!celular || !senha
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600'
                } text-white`}
            >
              Entrar
            </button>

            {/* Link para cadastro */}
            <div className="text-center mt-4">
              <p className="text-gray-400 text-sm">
                Não tem conta?{' '}
                <Link to="/cadastro" className="text-amber-400 hover:text-amber-300 font-semibold">
                  Faça cadastro
                </Link>
              </p>
            </div>

            {/* Link para ver cardápio sem login */}
            <div className="text-center mt-2">
              <Link
                to="/salgados"
                className="text-amber-400 transition-colors text-xl"
              >
                Veja nosso <span className="font-bold uppercase">cardápio.</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export { Login }