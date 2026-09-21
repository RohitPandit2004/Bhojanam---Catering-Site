import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { foodId, qty }

  function addItem(foodId, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.foodId === foodId)
      if (existing) {
        return prev.map((i) => (i.foodId === foodId ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { foodId, qty }]
    })
  }

  function setQty(foodId, qty) {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.foodId !== foodId)
      return prev.map((i) => (i.foodId === foodId ? { ...i, qty } : i))
    })
  }

  function removeItem(foodId) {
    setItems((prev) => prev.filter((i) => i.foodId !== foodId))
  }

  function clearCart() {
    setItems([])
  }

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, setQty, removeItem, clearCart, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
