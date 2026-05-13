<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PainelLayout from '@/components/PainelLayout.vue'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

// Array para controlar a linha do tempo dinamicamente
const etapas = ref([
  { id: 1, titulo: 'Habilitação', status: 'concluida' },
  { id: 2, titulo: 'Fila de espera', status: 'atual' },
  { id: 3, titulo: 'Aproximação', status: 'futura' },
  { id: 4, titulo: 'Convivência', status: 'futura' },
  { id: 5, titulo: 'Sentença', status: 'futura' }
])
</script>

<template>
  <PainelLayout>
    <div class="conteudo">
      <h1>Olá, {{ userStore.primeiroNome }}</h1>
      <p class="subtitulo">Vara da Infância — Recife · Iniciado em 12/03/2026</p>

      <!-- Novo Card da Linha do Tempo -->
      <div class="card-etapas">
        <p class="etapa-titulo">ETAPA ATUAL</p>
        
        <div class="stepper-wrapper">
          <!-- Linhas de fundo que conectam os pontos -->
          <div class="stepper-bg-line"></div>
          <div class="stepper-progress-line" style="width: 32%;"></div>

          <!-- Passos -->
          <div class="stepper">
            <div 
              v-for="etapa in etapas" 
              :key="etapa.id" 
              class="step" 
              :class="etapa.status"
            >
              <div class="step-icon">
                <i v-if="etapa.status === 'concluida'" class="ti ti-check"></i>
                <span v-else>{{ etapa.id }}</span>
              </div>
              <span class="step-label">{{ etapa.titulo }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Restante do código original -->
      <div class="card-fila">
        <p class="card-titulo">POSIÇÃO NA FILA</p>
        <div class="card-numero">
          <span class="numero">47</span>
          <p>de 312 habilitados<br>com perfil similar</p>
        </div>
        <div class="tags-perfil">
          <span>0 a 3 anos</span>
          <span>Qualquer etnia</span>
          <span>Sem irmãos</span>
        </div>
      </div>

      <div class="acoes">
        <button class="btn btn-primary" @click="router.push('/painel/documentos')">
          <i class="ti ti-file-text"></i>
          Ver documentos
        </button>
      </div>
    </div>
  </PainelLayout>
</template>

<style scoped>
.conteudo { max-width: 880px; }
h1 { font-size: 28px; margin-bottom: 4px; }
.subtitulo {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

/* --- Estilos da Linha do Tempo (Stepper) --- */
.card-etapas {
  background: #f8f9f5; /* Cor de fundo creme/acinzentada da imagem */
  border-radius: var(--radius-lg, 8px);
  padding: 24px 32px;
  margin-bottom: 24px;
}

.etapa-titulo {
  font-size: 12px;
  font-weight: 600;
  color: #7a7a7a;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
}

.stepper-wrapper {
  position: relative;
  padding: 0 10px;
}

/* Linha cinza base */
.stepper-bg-line {
  position: absolute;
  top: 15px; /* Metade da altura do ícone (30px) */
  left: 0;
  right: 0;
  height: 2px;
  background-color: #d1d5db;
  z-index: 1;
}

/* Linha azul de progresso */
.stepper-progress-line {
  position: absolute;
  top: 15px;
  left: 0;
  height: 2px;
  background-color: var(--color-primary, #2b6cb0); /* Usei um fallback de azul se a variável não existir */
  z-index: 2;
  transition: width 0.3s ease;
}

.stepper {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 3;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: transparent;
  width: 90px; /* Garante que o texto quebre e centralize direitinho */
}

.step-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #9ca3af;
}

.step-label {
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
}

/* Modificadores de Status: Concluída */
.step.concluida .step-icon {
  border-color: var(--color-primary, #2b6cb0);
  background-color: #e6f0fa; /* Fundo azul claro para passos concluídos */
  color: var(--color-primary, #2b6cb0);
}
.step.concluida .step-label {
  color: var(--color-primary, #2b6cb0);
}

/* Modificadores de Status: Atual */
.step.atual .step-icon {
  border-color: var(--color-primary, #2b6cb0);
  color: var(--color-primary, #2b6cb0);
}
.step.atual .step-label {
  color: var(--color-primary, #2b6cb0);
}

/* --- Restante dos Estilos Originais --- */
.card-fila {
  background: var(--color-primary-soft, #f0f7ff);
  border: 1px solid var(--color-primary-border, #cce4ff);
  border-radius: var(--radius-lg, 8px);
  padding: 20px;
  margin-bottom: 20px;
}
.card-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: 1px;
  margin-bottom: 12px;
}
.card-numero {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 12px;
}
.numero {
  font-size: 48px;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}
.card-numero p {
  font-size: 13px;
  color: var(--color-primary);
}
.tags-perfil {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tags-perfil span {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--color-bg, #ffffff);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-border);
}
.acoes { display: flex; gap: 12px; }
</style>