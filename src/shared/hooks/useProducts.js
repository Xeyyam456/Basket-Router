import { useQuery } from '@tanstack/react-query'
import { productService } from '@services/productService'
import { notifyError } from '@utils/toastHandlers'

function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll().then(res => res.products),
    onError: () => notifyError('Məhsullar yüklənilə bilmədi'),
  })

  return { products: data ?? [], loading: isLoading, error: error?.message ?? null }
}

export default useProducts
