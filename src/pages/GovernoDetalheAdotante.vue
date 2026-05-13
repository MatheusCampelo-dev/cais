<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GovernoLayout from '@/components/GovernoLayout.vue'

const router = useRouter()
const toast = ref(null)

const adotante = ref({
  nome: 'Maria Silva',
  cpf: '123.456.789-00',
  processo: '2026-001847',
  status: 'em-fila',
  perfil: '0 a 3 anos · Qualquer etnia · Sem irmãos',
  habilitado: '15/09/2025'
})

const checklist = ref([
  { id: 1, nome: 'Atestado de sanidade mental', entregue: true, marcadoAgora: true, porQuem: 'você' },
  { id: 2, nome: 'Certidão negativa criminal', entregue: false, marcadoAgora: false },
  { id: 3, nome: 'Laudo psicológico', entregue: false, marcadoAgora: false }
])

const marcarComoEntregue = (id) => {
  const item = checklist.value.find(c => c.id === id)
  if (!item) return
  item.entregue = true
  item.marcadoAgora = true
  item.porQuem = 'você'
  // limpa o "marcadoAgora" dos outros
  checklist.value.forEach(c => {
    if (c.id !== id) c.marcadoAgora = false
  })
  mostrarToast(item.nome)
}

const desfazer = (id) => {
  const item = checklist.value.find(c => c.id === id)
  if (!item) return
  item.entregue = false
  item.marcadoAgora = false
}

const mostrarToast = (nome) => {
  toast.value = { titulo: 'Documento atualizado', detalhe: `${nome} · entregue` }
  setTimeout(() => { toast.value = null }, 4000)
}

const fecharToast = () => { toast.value = null }
</script>

<template>
  <GovernoLayout>
    <div class="conteudo">
      <button class="voltar" @click="router.push('/governo/adotantes')" type="button">
        <i class="ti ti-arrow-left"></i>
        Lista de adotantes
      </button>

      <!-- Cabeçalho -->
      <div class="cabecalho">
        <div>
          <h1>{{ adotante.nome }}</h1>
          <p class="subtitulo">CPF {{ adotante.cpf }} · processo nº {{ adotante.processo }}</p>
        </div>
        <span class="badge-status">Em fila de espera</span>
      </div>

      <!-- Resumo -->
      <div class="resumo">
        <div class="resumo-item">
          <p class="resumo-label">Perfil</p>
          <p class="resumo-valor">{{ adotante.perfil }}</p>
        </div>
        <div class="resumo-item">
          <p class="resumo-label">Habilitado em</p>
          <p class="resumo-valor">{{ adotante.habilitado }}</p>
        </div>
      </div>

      <!-- Checklist -->
      <section class="bloco">
        <p class="bloco-titulo">CHECKLIST · REVISÃO DA VARA</p>
        <div class="checklist">
          <div
            v-for="item in checklist"
            :key="item.id"
            :class="['check-item', { entregue: item.entregue, novo: item.marcadoAgora }]"
          >
            <i :class="['ti', item.entregue ? 'ti-circle-check' : 'ti-circle']"></i>
            <div class="check-info">
              <p class="check-nome">{{ item.nome }}</p>
              <p v-if="item.marcadoAgora" class="check-detalhe">
                Marcado como entregue agora · {{ item.porQuem }}
              </p>
            </div>
            <button v-if="item.marcadoAgora" class="btn btn-ghost btn-pequeno" @click="desfazer(item.id)">
              Desfazer
            </button>
            <button v-else-if="!item.entregue" class="btn btn-ghost btn-pequeno" @click="marcarComoEntregue(item.id)">
              Marcar entregue
            </button>
          </div>
        </div>
      </section>

      <!-- Ações do processo -->
      <section class="bloco">
        <p class="bloco-titulo">AÇÕES DO PROCESSO</p>
        <div class="acoes">
          <button class="acao-card">
            <i class="ti ti-calendar-plus"></i>
            <span>Agendar entrevista</span>
          </button>
          <button class="acao-card">
            <i class="ti ti-circle-check"></i>
            <span>Aprovar etapa atual</span>
          </button>
          <button class="acao-card">
            <i class="ti ti-message"></i>
            <span>Registrar observação</span>
          </button>
          <button class="acao-card">
            <i class="ti ti-history"></i>
            <span>Histórico do processo</span>
          </button>
        </div>
      </section>

      <!-- Toast -->
      <transition name="toast">
        <div v-if="toast" class="toast">
          <i class="ti ti-circle-check"></i>
          <div class="toast-info">
            <p class="toast-titulo">{{ toast.titulo }}</p>
            <p class="toast-detalhe">{{ toast.detalhe }}</p>
          </div>
          <button class="toast-fechar" @click="fecharToast"><i class="ti ti-x"></i></button>
        </div>
      </transition>
    </div>
  </GovernoLayout>
</template>

<style scoped>
.conteudo {
  max-width: 880px;
  position: relative;
}

.voltar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-tertiary);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}
.voltar:hover { color: var(--color-primary); }

.cabecalho {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
h1 { font-size: 26px; font-weight: 600; margin-bottom: 4px; }
.subtitulo {
  font-size: 13px;
  color: var(--color-text-secondary);
}
.badge-status {
  font-size: 12px;
  padding: 5px 14px;
  border-radius: 14px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 500;
  white-space: nowrap;
}

.resumo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 28px;
}
.resumo-item {
  background: var(--color-bg-soft);
  border-radius: var(--radius-md);
  padding: 14px 16px;
}
.resumo-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.resumo-valor {
  font-size: 14px;
  margin-top: 4px;
}

.bloco { margin-bottom: 28px; }
.bloco-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin-bottom: 10px;
}

/* checklist */
.checklist {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--color-border);
}
.check-item:last-child { border-bottom: none; }
.check-item > .ti {
  font-size: 20px;
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}
.check-item.entregue {
  background: var(--color-success-soft);
  border-left: 3px solid var(--color-success);
}
.check-item.entregue > .ti { color: var(--color-success); }
.check-item.entregue .check-nome { color: var(--color-success); font-weight: 600; }

.check-info { flex: 1; }
.check-nome { font-size: 14px; }
.check-detalhe {
  font-size: 11px;
  color: var(--color-success);
  margin-top: 2px;
}

.btn-pequeno {
  font-size: 12px;
  padding: 6px 12px;
}

/* ações */
.acoes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.acao-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}
.acao-card:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.acao-card .ti {
  font-size: 18px;
  color: var(--color-text-secondary);
}
.acao-card:hover .ti { color: var(--color-primary); }

/* toast */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--color-success);
  color: white;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-md);
  max-width: 360px;
  z-index: 100;
}
.toast > .ti { font-size: 22px; }
.toast-titulo { font-size: 14px; font-weight: 600; }
.toast-detalhe {
  font-size: 12px;
  margin-top: 2px;
  opacity: 0.9;
}
.toast-fechar {
  color: white;
  opacity: 0.8;
  display: flex;
}
.toast-fechar:hover { opacity: 1; }

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
