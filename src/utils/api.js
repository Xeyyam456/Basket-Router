class ApiService {
  #baseUrl

  constructor(baseUrl) {
    this.#baseUrl = baseUrl
  }

  async #request(endpoint, options = {}) {
    const { headers, ...rest } = options
    const response = await fetch(`${this.#baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...headers },
      ...rest,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  get(endpoint, params) {
    const search = params ? `?${new URLSearchParams(params)}` : ''
    return this.#request(`${endpoint}${search}`)
  }

  post(endpoint, body) {
    return this.#request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  put(endpoint, body) {
    return this.#request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  delete(endpoint) {
    return this.#request(endpoint, { method: 'DELETE' })
  }
}

export default ApiService
