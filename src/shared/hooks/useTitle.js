import { useEffect } from 'react'

function useTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} | Basket` : 'Basket'
    return () => {
      document.title = prev
    }
  }, [title])
}

export default useTitle
