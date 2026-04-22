import { useState } from "react"
import { toast } from 'react-toastify'

const Cadastro = () => {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  // Estado para controlar o campo em foco (placeholder)
  const [focoNome, setFocoNome] = useState(false)
  const [focoTelefone, setFocoTelefone] = useState(false)
  const [focoEmail, setFocoEmail] = useState(false)
  const [focoSenha, setFocoSenha] = useState(false)

  // Função para validar formato do email
  const validarEmail = (email) => {
    // Expressão regular para verificar formato de email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Função para processar o cadastro
  const handleCadastro = () => {
    // Verifica se todos os campos estão preenchidos
    // if (!nome || !telefone || !email || !senha) {
    //   alert('Por favor, preencha todos os campos')
    //   return
    // }

    // Verifica se o email é válido
    if (!validarEmail(email)) {
      toast.warning('Por favor, digite um e-mail válido')
      return
    }

    // Verifica se a senha tem no mínimo 6 caracteres
    if (senha.length < 6) {
      toast.warning('A senha deve ter no mínimo 6 caracteres')
      return
    }

    // Simula o cadastro (salva no localStorage)
    const usuario = {
      nome: nome,
      telefone: telefone,
      email: email,
      senha: senha,
      dataCadastro: new Date().toISOString()
    }

    // Pega a lista de usuários cadastrados
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]')

    // Adiciona o novo usuário
    usuariosCadastrados.push(usuario)

    // Salva a lista completa
    localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados))

    // Salva o usuário atual (logado)
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario))

    // Marca como logado
    localStorage.setItem('logado', 'true')

    // Mostra mensagem de sucesso
    toast.success(`✅ Cadastro realizado! Bem-vindo(a), ${nome}!`)

    setTimeout(() => {
      window.location.href = '/salgados'
    }, 2500)

    // Redireciona para o cardápio
    // window.location.href = '/salgados'
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Título */}
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Criar Conta
        </h1>

        {/* Formulário */}
        <div className="space-y-6">
          {/* Campo Nome */}
          <div className="relative">
            {/* Label (título do campo) - só aparece quando tem foco OU tem texto */}
            <label
              htmlFor="nome"
              className={`absolute left-3 transition-all duration-200 pointer-events-none
      ${focoNome || nome
                  ? 'text-xs -top-2 text-amber-400 bg-gray-900 px-1'
                  : 'text-base top-3 text-gray-400'
                }`}
            >
              Nome Completo
            </label>

            {/* Input */}
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onFocus={() => setFocoNome(true)}
              onBlur={() => setFocoNome(false)}
              className="w-full bg-transparent border border-gray-600 rounded-lg py-3 px-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder=" "
            />
          </div>
          {/* Campo Telefone */}
          <div className="relative">
            {/* Label (título do campo) */}
            <label
              htmlFor="telefone"
              className={`absolute left-3 transition-all duration-200 pointer-events-none
      ${focoTelefone || telefone
                  ? 'text-xs -top-2 text-amber-400 bg-gray-900 px-1'
                  : 'text-base top-3 text-gray-400'
                }`}
            >
              Telefone
            </label>

            {/* Input com máscara de telefone */}
            <input
              id="telefone"
              type="tel"
              value={telefone}
              onChange={(e) => {
                // Aplica a máscara de telefone
                const valor = e.target.value
                // Remove tudo que não for número
                const numeros = valor.replace(/\D/g, '')

                // Aplica a máscara: (DD) 9 9999-9999
                let telefoneFormatado = ''
                if (numeros.length <= 2) {
                  telefoneFormatado = numeros
                } else if (numeros.length <= 3) {
                  telefoneFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
                } else if (numeros.length <= 7) {
                  telefoneFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3)}`
                } else {
                  telefoneFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3, 7)}-${numeros.slice(7, 11)}`
                }

                setTelefone(telefoneFormatado)
              }}
              onFocus={() => setFocoTelefone(true)}
              onBlur={() => setFocoTelefone(false)}
              className="w-full bg-transparent border border-gray-600 rounded-lg py-3 px-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
              placeholder=" "
            />
          </div>
          {/* Campo Email */}
          <div className="relative">
            {/* Label (título do campo) */}
            <label
              htmlFor="email"
              className={`absolute left-3 transition-all duration-200 pointer-events-none
      ${focoEmail || email
                  ? 'text-xs -top-2 text-amber-400 bg-gray-900 px-1'
                  : 'text-base top-3 text-gray-400'
                }`}
            >
              E-mail
            </label>

            {/* Input com validação de email */}
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocoEmail(true)}
              onBlur={() => setFocoEmail(false)}
              className={`w-full bg-transparent border rounded-lg py-3 px-3 text-white focus:outline-none focus:border-amber-400 transition-colors
      ${email && !validarEmail(email)
                  ? 'border-red-500'
                  : 'border-gray-600'
                }`}
              placeholder=" "
            />

            {/* Mensagem de erro (só aparece se email for inválido) */}
            {email && !validarEmail(email) && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                Digite um e-mail válido (exemplo@dominio.com)
              </p>
            )}
          </div>
          {/* Campo Senha */}
          <div className="relative">
            {/* Label (título do campo) */}
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

            {/* Input do tipo password (esconde os caracteres) */}
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

            {/* Dica de segurança (opcional) */}
            {senha && senha.length < 6 && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                A senha deve ter no mínimo 6 caracteres
              </p>
            )}
          </div>
          {/* Botão Cadastrar */}
          <button
            onClick={handleCadastro}
            disabled={!nome || !telefone || !email || !senha || senha.length < 6 || !validarEmail(email)}
            className={`w-full py-3 rounded-lg font-bold transition-colors
                ${!nome || !telefone || !email || !senha || senha.length < 6 || !validarEmail(email)
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600'
              } text-white`}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  )

}

export { Cadastro }