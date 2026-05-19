import { createContext, useContext, useState } from 'react'
import { notifySuccess, notifyInfo, notifyError } from '@utils/toastHandlers'

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
      const exists = prev.some(p => p.id === product.id)
      const next = exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
      saveToStorage(next)
      exists
        ? notifyInfo(`"${product.title}" favoritlərdən çıxarıldı`)
        : notifySuccess(`"${product.title}" favoritə əlavə edildi`)
      return next
    })
  }

  function clearFavorites() {
    setFavorites([])
    saveToStorage([])
    notifyError('Favorites təmizləndi')
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
