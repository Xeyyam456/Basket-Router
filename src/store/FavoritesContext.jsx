import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'favorites'

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

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFromStorage)

  function toggle(product) {
    setFavorites(prev => {
      const next = prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
      saveToStorage(next)
      return next
    })
  }

  function clearFavorites() {
    setFavorites([])
    saveToStorage([])
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
