import { useEffect } from 'react'

function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Basket` : 'Basket'
  }, [title])
}

export default useTitle
