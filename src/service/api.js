// Cliente HTTP base para a API do CAIS
// Substituir BASE_URL pelo endpoint real quando integrar com o back

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const request = async (path, options = {}) => {
  const url = `${BASE_URL}${path}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  }

  const res = await fetch(url, config)

  if (!res.ok) {
    const erro = await res.json().catch(() => ({ message: 'Erro na requisição' }))
    throw new Error(erro.message || `HTTP ${res.status}`)
  }

  return res.json()
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' })
}
