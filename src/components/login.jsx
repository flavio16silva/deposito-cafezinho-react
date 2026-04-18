// Importa os hooks necessários
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CarrinhoContext } from '../context/carrinhoContext'

const Login = () => {
  // Estados para armazenar os dados do formulário
  const [celular, setCelular] = useState('')
  const [senha, setSenha] = useState('')

  const { adicionar } = useContext(CarrinhoContext)

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
      celularFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3)}`
    } else {
      celularFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3, 7)}-${numeros.slice(7, 11)}`
    }

    return celularFormatado
  }

  // Função para processar o login
  const handleLogin = () => {
    // Verifica se os campos estão preenchidos
    if (!celular || !senha) {
      alert('Preencha todos os campos')
      return
    }

    // Busca usuário na lista de cadastrados
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]')
    const usuario = usuariosCadastrados.find(u => u.telefone === celular)

    if (!usuario) {
      alert('Usuário não encontrado! Faça seu cadastro primeiro.')
      return
    }

    // Verifica se o celular e senha correspondem
    if (usuario.telefone === celular && usuario.senha === senha) {
      localStorage.setItem('logado', 'true') // Marca como logado
      alert(`✅ Bem-vindo(a) de volta, ${usuario.nome}!`)

      // Salva os dados do usuário logado
      const usuarioLogado = {
        nome: usuario.nome,
        telefone: celular,
        email: usuario.email,
        senha: senha
      }
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
      localStorage.setItem('logado', 'true')

      // Verifica se tinha carrinho pendente antes do login
      const carrinhoPendente = localStorage.getItem('carrinhoPendente')

      if (carrinhoPendente) {
        // Recupera os itens do carrinho pendente
        const itensPendentes = JSON.parse(carrinhoPendente)

        // Adiciona cada item ao carrinho atual
        itensPendentes.forEach(item => {
          adicionar(item)
        })

        // Remove o carrinho pendente (já foi recuperado)
        localStorage.removeItem('carrinhoPendente')

        alert('🛒 Seu carrinho foi restaurado! Continue seu pedido.')
      }

      navigate('/salgados')
    } else {
      alert('❌ Celular ou senha incorretos!')
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