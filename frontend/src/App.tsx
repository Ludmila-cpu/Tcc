import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import PaymentPage from './pages/PaymentPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/produtos" element={<ProductsPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/pagamento" element={<PaymentPage />} />
    </Routes>
  )
}

export default App
