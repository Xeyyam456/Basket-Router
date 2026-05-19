import ApiService from '@utils/api'

const BASE_URL = 'https://dummyjson.com'

class ProductService extends ApiService {
  constructor() {
    super(BASE_URL)
  }

  getAll() {
    return this.get('/products', { limit: 0 })
  }

  getById(id) {
    return this.get(`/products/${id}`)
  }

  search(query) {
    return this.get('/products/search', { q: query })
  }

  getByCategory(category) {
    return this.get(`/products/category/${category}`)
  }

  getCategories() {
    return this.get('/products/categories')
  }
}

export const productService = new ProductService()
