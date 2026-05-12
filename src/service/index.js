import { api } from './api'

export const authService = {
  cadastrar: (dados) => api.post('/auth/cadastro', dados),
  entrar: (cpf, senha) => api.post('/auth/login', { cpf, senha }),
  sair: () => api.post('/auth/logout')
}

export const varasService = {
  listar: (filtros = {}) => {
    const params = new URLSearchParams(filtros).toString()
    return api.get(`/varas${params ? '?' + params : ''}`)
  },
  buscarPorComarca: (comarca) => api.get(`/varas/comarca/${comarca}`)
}

export const instituicoesService = {
  listar: () => api.get('/instituicoes'),
  buscarPorId: (id) => api.get(`/instituicoes/${id}`)
}

export const documentosService = {
  meusDocumentos: () => api.get('/documentos'),
  enviarCertificado: (arquivo) => {
    const form = new FormData()
    form.append('arquivo', arquivo)
    return fetch(`${import.meta.env.VITE_API_URL}/documentos/certificado`, {
      method: 'POST',
      body: form
    }).then(r => r.json())
  }
}
