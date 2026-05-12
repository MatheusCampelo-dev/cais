<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeaderPublico from '@/components/HeaderPublico.vue'

const router = useRouter()
const modo = ref('cadastrar') // 'cadastrar' | 'entrar'

const form = ref({
  nome: '',
  cpf: '',
  email: '',
  senha: ''
})

const submit = () => {
  // service/api fará a chamada real; por enquanto só simula login
  router.push('/painel/documentos')
}
</script>

<template>
  <div class="page">
    <HeaderPublico />
    <main class="conteudo">
      <div class="card">
        <h1>{{ modo === 'cadastrar' ? 'Criar conta' : 'Entrar' }}</h1>
        <p class="subtitulo">
          {{ modo === 'cadastrar' ? 'Preencha seus dados para iniciar o processo.' : 'Use seu CPF e senha cadastrados.' }}
        </p>

        <div class="tabs">
          <button :class="['tab', { ativa: modo === 'cadastrar' }]" @click="modo = 'cadastrar'">Cadastrar</button>
          <button :class="['tab', { ativa: modo === 'entrar' }]" @click="modo = 'entrar'">Já tenho conta</button>
        </div>

        <form @submit.prevent="submit">
          <div v-if="modo === 'cadastrar'" class="campo">
            <label>Nome completo</label>
            <input v-model="form.nome" type="text" placeholder="Como aparece no RG" required />
          </div>

          <div class="campo">
            <label>CPF</label>
            <input v-model="form.cpf" type="text" placeholder="000.000.000-00" required />
          </div>

          <div v-if="modo === 'cadastrar'" class="campo">
            <label>E-mail</label>
            <input v-model="form.email" type="email" placeholder="voce@email.com" required />
          </div>

          <div class="campo">
            <label>Senha</label>
            <input v-model="form.senha" type="password" placeholder="Mínimo 8 caracteres" required />
          </div>

          <button type="submit" class="btn btn-primary btn-submit">
            {{ modo === 'cadastrar' ? 'Criar conta' : 'Entrar' }}
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: var(--color-bg-warm); }
.conteudo {
  max-width: 480px;
  margin: 0 auto;
  padding: 48px 24px;
}
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 40px;
}
h1 {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 6px;
}
.subtitulo {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}
.tabs {
  display: flex;
  gap: 4px;
  background: var(--color-bg-soft);
  padding: 4px;
  border-radius: var(--radius-md);
  margin-bottom: 24px;
}
.tab {
  flex: 1;
  padding: 9px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  color: var(--color-text-secondary);
}
.tab.ativa {
  background: var(--color-bg);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
}
.campo {
  margin-bottom: 16px;
}
.campo label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}
.campo input {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  outline: none;
  transition: border 0.15s;
}
.campo input:focus {
  border-color: var(--color-primary);
}
.btn-submit {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
}
</style>
