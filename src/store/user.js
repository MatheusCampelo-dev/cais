import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const nome = ref('Maria Silva')
  const email = ref('maria.silva@email.com')
  const cpf = ref('123.456.789-00')
  const autenticado = ref(false)

  const iniciais = computed(() => {
    return nome.value
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase()
  })

  const primeiroNome = computed(() => nome.value.split(' ')[0])

  const login = (dados) => {
    if (dados?.nome) nome.value = dados.nome
    if (dados?.email) email.value = dados.email
    autenticado.value = true
  }

  const logout = () => {
    autenticado.value = false
  }

  return { nome, email, cpf, autenticado, iniciais, primeiroNome, login, logout }
})
