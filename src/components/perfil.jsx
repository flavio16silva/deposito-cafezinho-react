import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Perfil = () => {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  // BUSCAR DADOS DO USUÁRIO AO CARREGAR A PÁGINA
  const carregarPerfil = async () => {
    try {
      setCarregando(true)

      //Pega dados do localStorage
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

      // Se não tiver, mostra erro
      if (!usuarioLogado) {
        setErro('Usuário não está logado')
        return
      }

      // Busca no backend
      const res = await fetch(`http://localhost:3001/api/usuarios/${usuarioLogado.id}`)

      // Se deu erro, lança exceção
      if (!res.ok) throw new Error('Erro ao carregar dados')

      // Guarda os dados
      const dados = await res.json()
      setUsuario(dados)

    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarPerfil()
  }, [])

  // FUNÇÃO PARA SALVAR AS ALTERAÇÕES  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setCarregando(true)

      //Recuperar o ID do usuário logado
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

      if (!usuarioLogado) {
        toast.error('Usuário não está logado')
        return
      }

      // Preparar os dados para enviar
      const dadosAtualizados = {
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone
      }

      //Enviar para o backend
      const response = await fetch(`http://localhost:3001/api/usuarios/${usuarioLogado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
      })

      // Verificar resposta
      if (!response.ok) {
        const erro = await response.json()
        throw new Error(erro.erro || 'Erro ao atualizar dados')
      }

      // Atualizar o localStorage com os novos dados
      const usuarioAtualizado = {
        ...usuarioLogado,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone
      }
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado))

      // Mostrar mensagem de sucesso
      toast.success('Dados atualizados com sucesso!')

      // Voltar para a página anterior (opcional)
      setTimeout(() => {
        navigate(-1)
      }, 1500)

    } catch (error) {
      console.error('❌ Erro ao salvar perfil:', error)
      toast.error(error.message || 'Erro ao salvar alterações')
    } finally {
      setCarregando(false)
    }
  }


  // RENDERIZAÇÃO DA TELA  
  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-white text-xl">Carregando...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
        <p className="text-red-500 text-xl mb-4">{erro}</p>
        <button
          onClick={() => navigate('/salgados')}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg"
        >
          Voltar ao Cardápio
        </button>
      </div>
    )
  }

  if (!usuario) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Voltar
          </button>
          <h1 className="text-xl font-bold text-white text-center">
            Meus Dados
          </h1>
          <div className="w-16"></div> {/* Espaço para equilibrar */}
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Campo Nome */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Nome completo
            </label>
            <input
              type="text"
              value={usuario.nome}
              onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
              required
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
              required
            />
          </div>

          {/* Campo Telefone */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Telefone
            </label>
            <input
              type="tel"
              value={usuario.telefone}
              onChange={(e) => setUsuario({ ...usuario, telefone: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
              required
            />
          </div>

          {/* Botão Salvar */}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiSave className="text-lg" />
            <span>Salvar Alterações</span>
          </button>


        </form>
      </div>
    </div>
  )
}

export { Perfil }