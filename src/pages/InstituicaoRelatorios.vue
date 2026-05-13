<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import InstituicaoLayout from '@/components/InstituicaoLayout.vue'

const router = useRouter()
const busca = ref('')
const filtroAtivo = ref('todos')

const relatorios = [
  {
    id: 1,
    adotante: 'Maria Silva',
    processo: '2026-001847',
    visita: '1ª de aproximação',
    dataVisita: '05/05/2026',
    enviadoEm: '06/05/2026',
    autor: 'Roberta Pessoa',
    recomendacao: 'prosseguir',
    status: 'enviado'
  },
  {
    id: 2,
    adotante: 'Carla Souza',
    processo: '2025-003012',
    visita: 'Acompanhamento de convivência',
    dataVisita: '28/04/2026',
    enviadoEm: '29/04/2026',
    autor: 'Roberta Pessoa',
    recomendacao: 'prosseguir',
    status: 'enviado'
  },
  {
    id: 3,
    adotante: 'João e Ana Lima',
    processo: '2026-001902',
    visita: '2ª de aproximação',
    dataVisita: '20/04/2026',
    enviadoEm: '21/04/2026',
    autor: 'Pedro Almeida',
    recomendacao: 'acompanhamento',
    status: 'enviado'
  },
  {
    id: 4,
    adotante: 'Maria Silva',
    processo: '2026-001847',
    visita: 'Visita preliminar',
    dataVisita: '05/05/2026',
    enviadoEm: null,
    autor: '—',
    recomendacao: null,
    status: 'rascunho'
  },
  {
    id: 5,
    adotante: 'Carla Souza',
    processo: '2025-003012',
    visita: '4ª de aproximação',
    dataVisita: '10/04/2026',
    enviadoEm: '11/04/2026',
    autor: 'Roberta Pessoa',
    recomendacao: 'prosseguir',
    status: 'enviado'
  }
]

const recomendacaoLabels = {
  prosseguir: { label: 'Prosseguir', cor: 'verde' },
  acompanhamento: { label: 'Acompanhamento', cor: 'ambar' },
  interromper: { label: 'Interromper', cor: 'vermelho' }
}

const filtrados = computed(() => {
  let lista = relatorios
  if (filtroAtivo.value !== 'todos') {
    lista = lista.filter(r => r.status === filtroAtivo.value)
  }
  if (busca.value) {
    const q = busca.value.toLowerCase()
    lista = lista.filter(r =>
      r.adotante.toLowerCase().includes(q) ||
      r.processo.includes(q)
    )
  }
  return lista
})

const enviados = computed(() => relatorios.filter(r => r.status === 'enviado').length)
const rascunhos = computed(() => relatorios.filter(r => r.status === 'rascunho').length)

const abrirRelatorio = (rel) => {
  if (rel.status === 'rascunho') {
    router.push(`/instituicao/visitas/${rel.id}/relatorio`)
  } else {
    alert(`Visualizando relatório #${rel.id} — ${rel.adotante}`)
  }
}
</script>

<template>
  <InstituicaoLayout>
    <div class="conteudo">
      <div class="cabecalho">
        <div>
          <h1>Relatórios</h1>
          <p class="subtitulo">{{ enviados }} enviados · {{ rascunhos }} em rascunho</p>
        </div>
        <button class="btn btn-ghost">
          <i class="ti ti-download"></i>
          Exportar tudo
        </button>
      </div>

      <!-- Busca e filtros -->
      <div class="filtros">
        <div class="campo-busca">
          <i class="ti ti-search"></i>
          <input v-model="busca" placeholder="Buscar por adotante ou processo..." />
        </div>
        <div class="chips">
          <button :class="['chip', { ativo: filtroAtivo === 'todos' }]" @click="filtroAtivo = 'todos'">
            Todos
          </button>
          <button :class="['chip', { ativo: filtroAtivo === 'enviado' }]" @click="filtroAtivo = 'enviado'">
            Enviados
          </button>
          <button :class="['chip', { ativo: filtroAtivo === 'rascunho' }]" @click="filtroAtivo = 'rascunho'">
            Rascunhos
          </button>
        </div>
      </div>

      <!-- Tabela -->
      <div class="tabela">
        <div class="thead">
          <div>Adotante</div>
          <div>Visita</div>
          <div>Realizada em</div>
          <div>Enviado em</div>
          <div>Recomendação</div>
          <div>Status</div>
        </div>
        <div
          v-for="rel in filtrados"
          :key="rel.id"
          class="trow"
          @click="abrirRelatorio(rel)"
        >
          <div class="td-adotante">
            <p class="nome">{{ rel.adotante }}</p>
            <p class="ref">{{ rel.processo }}</p>
          </div>
          <div class="td-meta">{{ rel.visita }}</div>
          <div class="td-meta">{{ rel.dataVisita }}</div>
          <div class="td-meta">{{ rel.enviadoEm || '—' }}</div>
          <div>
            <span v-if="rel.recomendacao" :class="['recomendacao-tag', `rec-${recomendacaoLabels[rel.recomendacao].cor}`]">
              {{ recomendacaoLabels[rel.recomendacao].label }}
            </span>
            <span v-else class="td-meta">—</span>
          </div>
          <div>
            <span :class="['status-tag', `st-${rel.status}`]">
              {{ rel.status === 'enviado' ? 'Enviado' : 'Rascunho' }}
            </span>
          </div>
        </div>

        <div v-if="filtrados.length === 0" class="vazio">
          Nenhum relatório encontrado.
        </div>
      </div>

      <!-- Aviso -->
      <div class="aviso">
        <i class="ti ti-lock"></i>
        <p>
          Os relatórios são confidenciais e visíveis apenas para a Vara da Infância e para a equipe técnica desta instituição.
        </p>
      </div>
    </div>
  </InstituicaoLayout>
</template>

<style scoped>
.conteudo { max-width: 1080px; }

.cabecalho {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
h1 { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
.subtitulo { font-size: 14px; color: var(--color-text-secondary); }

.filtros {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}
.campo-busca {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
.campo-busca .ti { font-size: 16px; color: var(--color-text-tertiary); }
.campo-busca input { flex: 1; border: none; outline: none; background: transparent; font-size: 14px; }

.chips { display: flex; gap: 4px; }
.chip {
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-secondary);
}
.chip.ativo {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* tabela */
.tabela {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg);
  margin-bottom: 20px;
}
.thead {
  display: grid;
  grid-template-columns: 1.5fr 1.6fr 1fr 1fr 1.2fr 1fr;
  gap: 14px;
  padding: 12px 18px;
  background: var(--color-bg-soft);
  border-bottom: 1px solid var(--color-border);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
}
.trow {
  display: grid;
  grid-template-columns: 1.5fr 1.6fr 1fr 1fr 1.2fr 1fr;
  gap: 14px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}
.trow:last-child { border-bottom: none; }
.trow:hover { background: var(--color-bg-soft); }

.td-adotante .nome { font-weight: 600; font-size: 14px; }
.td-adotante .ref { font-size: 11px; color: var(--color-text-tertiary); margin-top: 2px; }
.td-meta { color: var(--color-text-secondary); }

.recomendacao-tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 500;
  display: inline-block;
}
.rec-verde { background: var(--color-success-soft); color: var(--color-success); }
.rec-ambar { background: var(--color-warning-soft); color: var(--color-warning); }
.rec-vermelho { background: var(--color-danger-soft); color: var(--color-danger); }

.status-tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 500;
  display: inline-block;
}
.st-enviado { background: var(--color-success-soft); color: var(--color-success); }
.st-rascunho { background: var(--color-bg-soft); color: var(--color-text-secondary); }

.vazio {
  padding: 36px;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-tertiary);
}

.aviso {
  display: flex;
  gap: 10px;
  background: var(--color-warning-soft);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  align-items: center;
}
.aviso .ti { font-size: 18px; color: var(--color-warning); flex-shrink: 0; }
.aviso p { font-size: 12px; color: var(--color-warning); line-height: 1.5; }
</style>
