import { useState, useEffect } from "react"
import { CarrinhoContext } from "./carrinhoContext"

// 2. Cria o provedor (Local dos dados)
export const CarrinhoProvider = ({ children }) => {
  // Carregar dados salvos
  // Estado inicializado com o valor do localStorage
  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem("carrinho")
    return salvo ? JSON.parse(salvo) : []
  })

  // 5. Salvar quando mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens))
  }, [itens])

  // 6. Funções de todos os componente
  const adicionar = (produto) => {
    setItens(itensAtuais => {
      // Procura se o item já está no carrinho
      const itemExistente = itensAtuais.find(item => item.id === produto.id)

      if (itemExistente) {
        // Item já existe → aumenta a quantidade
        return itensAtuais.map(item =>
          item.id === produto.id
            ? {
              ...item,
              quantidade: item.quantidade + produto.quantidade,
              total: item.total + produto.total
            }
            : item
        )
      }

      // Item não existe → adiciona novo
      return [...itensAtuais, produto]
    })
  }

  const remover = (id) => {
    setItens(itens.filter(item => item.id !== id))
  }

  // Aumenta a quantidade do item
  const aumentar = (id) => {
    setItens(itens.map(item =>
      item.id === id
        ? {
          ...item,
          quantidade: item.quantidade + 1,
          total: item.total + (item.unidades * item.precoUnitario)
        }
        : item
    ))
  }

  // Diminui a quantidade do item
  const diminuir = (id) => {
    setItens(itens.map(item =>
      item.id === id && item.quantidade > 1
        ? {
          ...item,
          quantidade: item.quantidade - 1,
          total: item.total - (item.unidades * item.precoUnitario)
        }
        : item
    ))
  }

  const total = itens.reduce((soma, item) => soma + item.total, 0)

  // 7. Disponibilizar dados e funções
  return (
    <CarrinhoContext.Provider value={{
      itens,
      setItens,
      adicionar,
      remover,
      aumentar,
      diminuir,
      total
    }}>
      {children}
    </CarrinhoContext.Provider>
  )
}