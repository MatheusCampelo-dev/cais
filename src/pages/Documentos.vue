<script setup>
import { useRouter } from 'vue-router'
import PainelLayout from '@/components/PainelLayout.vue'

const router = useRouter()

const documentos = [
  { nome: 'RG e CPF', icone: 'ti-id', cor: 'verde', status: 'entregue', detalhe: 'Entregue em 18/03/2026' },
  { nome: 'Comprovante de residência', icone: 'ti-home', cor: 'verde', status: 'entregue', detalhe: 'Entregue em 18/03/2026' },
  { nome: 'Certidão de nascimento ou casamento', icone: 'ti-license', cor: 'verde', status: 'entregue', detalhe: 'Entregue em 25/03/2026' },
  { nome: 'Comprovante de renda', icone: 'ti-coin', cor: 'verde', status: 'entregue', detalhe: 'Entregue em 25/03/2026' },
  { nome: 'Atestado de sanidade mental', icone: 'ti-alert-triangle', cor: 'vermelho', status: 'reentregar', detalhe: 'Documento vencido — apresente versão atualizada' },
  { nome: 'Certidão negativa criminal', icone: 'ti-circle', cor: 'cinza', status: 'pendente', detalhe: 'Aguardando entrega presencial' },
  { nome: 'Laudo psicológico', icone: 'ti-circle', cor: 'cinza', status: 'pendente', detalhe: 'Aguardando entrega presencial' },
  { nome: 'Certificado do Curso de Preparação', icone: 'ti-upload', cor: 'azul', status: 'upload', detalhe: 'Único documento com upload digital' }
]

const entregues = documentos.filter(d => d.status === 'entregue').length
const total = documentos.length
</script>

<template>
  <PainelLayout>
    <div class="conteudo">
      <button class="voltar" @click="router.push('/painel')" type="button">
        <i class="ti ti-arrow-left"></i>
        Voltar ao painel
      </button>

      <h1>Documentos</h1>
      <p class="subtitulo">{{ entregues }} de {{ total }} itens entregues</p>

      <!-- Aviso de processo presencial -->
      <div class="aviso">
        <i class="ti ti-info-circle"></i>
        <p>
          Os documentos devem ser entregues presencialmente na Vara da Infância.<br>
          O sistema apenas exibe o que falta. Exceção: o Certificado do Curso de Preparação tem upload digital.
        </p>
      </div>

      <!-- Lista de documentos -->
      <div class="lista">
        <div v-for="(doc, idx) in documentos" :key="idx" class="doc-item">
          <div :class="['doc-icone', `cor-${doc.cor}`]">
            <i :class="['ti', doc.icone]"></i>
          </div>
          <div class="doc-info">
            <p class="doc-nome">{{ doc.nome }}</p>
            <p :class="['doc-detalhe', { erro: doc.status === 'reentregar' }]">{{ doc.detalhe }}</p>
          </div>
          <span v-if="doc.status === 'entregue'" class="status entregue">Entregue</span>
          <span v-else-if="doc.status === 'reentregar'" class="status reentregar">Reentregar</span>
          <span v-else-if="doc.status === 'pendente'" class="status pendente">Pendente</span>
          <button v-else-if="doc.status === 'upload'" class="btn btn-outline btn-upload">
            Enviar arquivo
          </button>
        </div>
      </div>
    </div>
  </PainelLayout>
</template>

<style scoped>
.conteudo {
  max-width: 880px;
}
.voltar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  padding: 0;
}
.voltar:hover { text-decoration: underline; }

h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 4px;
}
.subtitulo {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}

.aviso {
  background: var(--color-warning-soft);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
}
.aviso .ti {
  font-size: 20px;
  color: var(--color-warning);
  flex-shrink: 0;
}
.aviso p {
  font-size: 13px;
  color: var(--color-warning);
  line-height: 1.6;
}

/* lista */
.lista {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.doc-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: var(--color-bg);
}

.doc-icone {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.cor-verde { background: var(--color-success-soft); color: var(--color-success); }
.cor-vermelho { background: var(--color-danger-soft); color: var(--color-danger); }
.cor-cinza { background: var(--color-bg-soft); color: var(--color-text-tertiary); }
.cor-azul { background: var(--color-primary-soft); color: var(--color-primary); }

.doc-info { flex: 1; }
.doc-nome {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}
.doc-detalhe {
  font-size: 12px;
  color: var(--color-text-tertiary);
}
.doc-detalhe.erro {
  color: var(--color-danger);
}

.status {
  font-size: 12px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 14px;
  flex-shrink: 0;
}
.status.entregue {
  background: var(--color-success-soft);
  color: var(--color-success);
}
.status.reentregar {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
.status.pendente {
  background: var(--color-bg-soft);
  color: var(--color-text-tertiary);
}
.btn-upload {
  padding: 7px 14px;
  font-size: 12px;
  flex-shrink: 0;
}
</style>
