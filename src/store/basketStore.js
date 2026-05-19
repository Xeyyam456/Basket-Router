import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { notifySuccess, notifyInfo, notifyError } from '@utils/toastHandlers'

export const useBasket = create(
  persist(
    (set, get) => ({
      basket: [],

      toggle(product) {
        const exists = get().basket.some(p => p.id === product.id)
        if (exists) {
          set(state => ({ basket: state.basket.filter(p => p.id !== product.id) }))
          notifyInfo(`"${product.title}" basketdən çıxarıldı`)
        } else {
          set(state => ({ basket: [...state.basket, { ...product, quantity: 1 }] }))
          notifySuccess(`"${product.title}" basketə əlavə edildi`)
        }
      },

      increment(id) {
        set(state => ({
          basket: state.basket.map(p =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        }))
      },

      decrement(id) {
        set(state => ({
          basket: state.basket.map(p =>
            p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
          ),
        }))
      },

      clearBasket() {
        set({ basket: [] })
        notifyError('Basket təmizləndi')
      },

      isInBasket(id) {
        return get().basket.some(p => p.id === id)
      },
    }),
    { name: 'basket' }
  )
)
