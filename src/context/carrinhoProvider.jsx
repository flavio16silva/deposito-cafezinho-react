import { useState, useEffect } from "react"
import { CarrinhoContext } from "./carrinhoContext"

// 2. Cria o provedor (dona dos dados)
export const CarrinhoProvider = ({ children }) => {
  // 4. Carregar dados salvos
  // Estado inicializado diretamente com o valor do localStorage
  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem("carrinho")
    return salvo ? JSON.parse(salvo) : []
  })

  // 5. Salvar quando mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens))
  }, [itens])

  // 6. Funções que qualquer componente pode usar
  const adicionar = (produto) => {
    setItens([...itens, produto])
  }

  const remover = (id) => {
    setItens(itens.filter(item => item.id !== id))
  }

  const aumentar = (id) => {
    setItens(itens.map(item =>
      item.id === id
        ? { ...item, quantidade: item.quantidade + 1, total: (item.quantidade + 1) * item.precoUnitario }
        : item
    ))
  }

  const diminuir = (id) => {
    setItens(itens.map(item =>
      item.id === id && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1, total: (item.quantidade - 1) * item.precoUnitario }
        : item
    ))
  }

  const total = itens.reduce((soma, item) => soma + item.total, 0)

  // 7. Disponibilizar dados e funções
  return (
    <CarrinhoContext.Provider value={{
      itens,
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