import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { notifySuccess, notifyInfo, notifyError } from '@utils/toastHandlers'

export const useFavorites = create(
  persist(
    (set, get) => ({
      favorites: [],

      toggle(product) {
        const exists = get().favorites.some(p => p.id === product.id)
        if (exists) {
          set(state => ({ favorites: state.favorites.filter(p => p.id !== product.id) }))
          notifyInfo(`"${product.title}" favoritlərdən çıxarıldı`)
        } else {
          set(state => ({ favorites: [...state.favorites, product] }))
          notifySuccess(`"${product.title}" favoritə əlavə edildi`)
        }
      },

      clearFavorites() {
        set({ favorites: [] })
        notifyError('Favorites təmizləndi')
      },
    }),
    { name: 'favorites' }
  )
)
