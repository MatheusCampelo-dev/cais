<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GovernoLayout from '@/components/GovernoLayout.vue'

const router = useRouter()
const busca = ref('')
const filtroStatus = ref('em-fila')
const filtroComarca = ref('recife')

const adotantes = [
  { id: 1, nome: 'Maria Silva', cpf: '123.456.789-00', processo: '2026-001847', status: 'em-fila', habilitado: '15/09/2025', posicao: '47 / 312' },
  { id: 2, nome: 'João e Ana Lima', cpf: '987.654.321-00', processo: '2026-001902', status: 'aproximacao', habilitado: '02/06/2024', posicao: '—' },
  { id: 3, nome: 'Paulo Mendes', cpf: '456.789.123-00', processo: '2026-001321', status: 'em-fila', habilitado: '28/01/2025', posicao: '112 / 312' },
  { id: 4, nome: 'Carla Souza', cpf: '234.567.890-00', processo: '2025-003012', status: 'convivencia', habilitado: '11/03/2023', posicao: '—' },
  { id: 5, nome: 'Roberto e Helena Cunha', cpf: '345.678.901-00', processo: '2026-002104', status: 'documentacao', habilitado: '—', posicao: '—' },
  { id: 6, nome: 'Fernanda Oliveira', cpf: '567.890.123-00', processo: '2026-002201', status: 'em-fila', habilitado: '20/10/2025', posicao: '78 / 312' }
]

const statusLabels = {
  'em-fila': { label: 'Em fila', classe: 'azul' },
  'aproximacao': { label: 'Aproximação', classe: 'ambar' },
  'convivencia': { label: 'Convivência', classe: 'verde' },
  'documentacao': { label: 'Documentação', classe: 'cinza' }
}

const paginaAtual = ref(1)
const porPagina = 5

const filtrados = computed(() => {
  let lista = adotantes
  if (busca.value) {
    const q = busca.value.toLowerCase()
    lista = lista.filter(a =>
      a.nome.toLowerCase().includes(q) ||
      a.cpf.includes(q) ||
      a.processo.includes(q)
    )
  }
  if (filtroStatus.value) {
    lista = lista.filter(a => a.status === filtroStatus.value)
  }
  return lista
})

const paginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * porPagina
  return filtrados.value.slice(inicio, inicio + porPagina)
})

const totalPaginas = computed(() => Math.ceil(filtrados.value.length / porPagina) || 1)

const removerFiltro = (chave) => {
  if (chave === 'status') filtroStatus.value = ''
  if (chave === 'comarca') filtroComarca.value = ''
}
</script>

<template>
  <GovernoLayout>
    <div class="conteudo">
      <div class="cabecalho">
        <div>
          <h1>Consulta de adotantes</h1>
          <p class="subtitulo">312 processos ativos na comarca</p>
        </div>
        <button class="btn btn-ghost">
          <i class="ti ti-download"></i>
          Exportar
        </button>
      </div>

      <!-- Busca e filtros -->
      <div class="filtros">
        <div class="campo-busca">
          <i class="ti ti-search"></i>
          <input v-model="busca" type="text" placeholder="Buscar por nome, CPF ou processo..." />
        </div>
        <div v-if="filtroStatus" class="chip-filtro">
          <span>Status: {{ statusLabels[filtroStatus].label }}</span>
          <button @click="removerFiltro('status')"><i class="ti ti-x"></i></button>
        </div>
        <div v-if="filtroComarca" class="chip-filtro">
          <span>Comarca: Recife</span>
          <button @click="removerFiltro('comarca')"><i class="ti ti-x"></i></button>
        </div>
        <button class="chip-add">
          <i class="ti ti-plus"></i>
          Habilitação após...
        </button>
      </div>

      <!-- Tabela -->
      <div class="tabela">
        <div class="thead">
          <div>Adotante</div>
          <div>Status</div>
          <div>Habilitado em</div>
          <div>Posição</div>
          <div></div>
        </div>
        <div
          v-for="ad in paginados"
          :key="ad.id"
          class="trow"
          @click="router.push(`/governo/adotantes/${ad.id}`)"
        >
          <div class="td-adotante">
            <p class="nome">{{ ad.nome }}</p>
            <p class="ref">{{ ad.cpf }} · {{ ad.processo }}</p>
          </div>
          <div>
            <span :class="['status-tag', `tag-${statusLabels[ad.status].classe}`]">
              {{ statusLabels[ad.status].label }}
            </span>
          </div>
          <div class="td-data">{{ ad.habilitado }}</div>
          <div class="td-data">{{ ad.posicao }}</div>
          <div class="td-acao">
            <i class="ti ti-chevron-right"></i>
          </div>
        </div>

        <div v-if="paginados.length === 0" class="vazio-tabela">
          Nenhum adotante encontrado com os filtros aplicados.
        </div>
      </div>

      <!-- Paginação -->
      <div class="paginacao">
        <p class="paginacao-info">
          Mostrando {{ paginados.length ? (paginaAtual - 1) * porPagina + 1 : 0 }}–{{ (paginaAtual - 1) * porPagina + paginados.length }} de {{ filtrados.length }}
        </p>
        <div class="paginacao-controles">
          <button
            class="btn btn-ghost btn-pagina"
            :disabled="paginaAtual === 1"
            @click="paginaAtual--"
          >
            Anterior
          </button>
          <button
            v-for="p in totalPaginas"
            :key="p"
            :class="['btn btn-pagina', { 'btn-primary': paginaAtual === p, 'btn-ghost': paginaAtual !== p }]"
            @click="paginaAtual = p"
          >
            {{ p }}
          </button>
          <button
            class="btn btn-ghost btn-pagina"
            :disabled="paginaAtual === totalPaginas"
            @click="paginaAtual++"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  </GovernoLayout>
</template>

<style scoped>
.conteudo { max-width: 1080px; }

.cabecalho {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}
h1 { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
.subtitulo {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* filtros */
.filtros {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}
.campo-busca {
  flex: 1;
  min-width: 280px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
.campo-busca .ti {
  font-size: 16px;
  color: var(--color-text-tertiary);
}
.campo-busca input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
}
.chip-filtro {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--color-primary-border);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  border-radius: var(--radius-md);
  font-size: 13px;
}
.chip-filtro button {
  display: flex;
  padding: 0;
  color: var(--color-primary);
}
.chip-add {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--color-text-secondary);
}
.chip-add:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* tabela */
.tabela {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg);
}
.thead {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1fr 60px;
  gap: 16px;
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
  grid-template-columns: 2fr 1.2fr 1.2fr 1fr 60px;
  gap: 16px;
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
.td-adotante .ref {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}
.td-data { color: var(--color-text-secondary); }
.td-acao { text-align: right; color: var(--color-text-tertiary); }

.status-tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 500;
  display: inline-block;
}
.tag-azul { background: var(--color-primary-soft); color: var(--color-primary); }
.tag-ambar { background: var(--color-warning-soft); color: var(--color-warning); }
.tag-verde { background: var(--color-success-soft); color: var(--color-success); }
.tag-cinza { background: var(--color-bg-soft); color: var(--color-text-secondary); }

.vazio-tabela {
  padding: 36px 24px;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-tertiary);
}

/* paginação */
.paginacao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}
.paginacao-info {
  font-size: 12px;
  color: var(--color-text-tertiary);
}
.paginacao-controles {
  display: flex;
  gap: 4px;
}
.btn-pagina {
  padding: 6px 12px;
  font-size: 12px;
  min-width: 32px;
}
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
