<script setup>
import { useRouter } from 'vue-router'
import PainelLayout from '@/components/PainelLayout.vue'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <PainelLayout>
    <div class="conteudo">
      <h1>Olá, {{ userStore.primeiroNome }}</h1>
      <p class="subtitulo">Vara da Infância — Recife · Iniciado em 12/03/2026</p>

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
.card-fila {
  background: var(--color-primary-soft);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-lg);
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
  background: var(--color-bg);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-border);
}
.acoes { display: flex; gap: 12px; }
</style>
