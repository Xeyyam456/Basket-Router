import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'basket'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const BasketContext = createContext()

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState(loadFromStorage)

  function toggle(product) {
    setBasket(prev => {
      const next = prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, { ...product, quantity: 1 }]
      saveToStorage(next)
      return next
    })
  }

  function increment(id) {
    setBasket(prev => {
      const next = prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
      saveToStorage(next)
      return next
    })
  }

  function decrement(id) {
    setBasket(prev => {
      const next = prev.map(p => p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p)
      saveToStorage(next)
      return next
    })
  }

  function clearBasket() {
    setBasket([])
    saveToStorage([])
  }

  function isInBasket(productId) {
    return basket.some(p => p.id === productId)
  }

  return (
    <BasketContext.Provider value={{ basket, toggle, increment, decrement, clearBasket, isInBasket }}>
      {children}
    </BasketContext.Provider>
  )
}

export function useBasket() {
  return useContext(BasketContext)
}
