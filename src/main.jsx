import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.jsx"
import { CarrinhoProvider } from "./context/carrinhoProvider.jsx"
import "./index.css"


const rootElement = document.querySelector('[data-js="root"]')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </StrictMode>
)