import { useSearchParams } from 'react-router-dom'

function applyFilter(products, q) {
  if (!q) return products
  const lower = q.toLowerCase()
  return products.filter(p =>
    p.title.toLowerCase().includes(lower) ||
    p.category.toLowerCase().includes(lower)
  )
}

function applySort(products, sort) {
  if (!sort) return products
  return [...products].sort((a, b) => {
    if (sort === 'name-asc')   return a.title.localeCompare(b.title)
    if (sort === 'name-desc')  return b.title.localeCompare(a.title)
    if (sort === 'price-asc')  return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })
}

function useSearchFilter(products) {
  const [searchParams] = useSearchParams()
  const q    = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || ''
  return applySort(applyFilter(products, q), sort)
}

export default useSearchFilter
