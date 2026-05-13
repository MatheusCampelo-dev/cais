<script setup>
import { ref, computed } from 'vue'
import PainelLayout from '@/components/PainelLayout.vue'

const filtroAtivo = ref('todos')

const agendamentos = [
  {
    id: 1,
    titulo: 'Entrega de documentos',
    local: 'Vara da Infância — Recife',
    endereco: 'Av. Desembargador Guerra Barreto, 200 — Ilha Joana Bezerra',
    data: '2026-05-18',
    diaSemana: 'Segunda',
    horario: '14h às 15h',
    tipo: 'vara',
    status: 'confirmado',
    icone: 'ti-file-text',
    cor: 'azul'
  },
  {
    id: 2,
    titulo: 'Entrevista psicológica',
    local: 'Vara da Infância — Recife',
    endereco: 'Sala 4 · 3º andar',
    data: '2026-05-25',
    diaSemana: 'Segunda',
    horario: '10h às 11h30',
    tipo: 'vara',
    status: 'confirmado',
    icone: 'ti-message-circle',
    cor: 'roxo'
  },
  {
    id: 3,
    titulo: '1ª visita de aproximação',
    local: 'Lar Pequeno Príncipe',
    endereco: 'R. das Flores, 240 — Boa Vista, Recife',
    data: '2026-05-14',
    diaSemana: 'Quinta',
    horario: '14h às 16h',
    tipo: 'instituicao',
    status: 'confirmado',
    icone: 'ti-home-heart',
    cor: 'verde'
  }
]

const historico = [
  { titulo: 'Curso de preparação · Encontro 4', local: 'Vara da Infância — Recife', data: '02/05/2026', status: 'compareceu' },
  { titulo: 'Visita domiciliar', local: 'Equipe técnica da Vara', data: '18/04/2026', status: 'compareceu' },
  { titulo: 'Entrevista social', local: 'Vara da Infância — Recife', data: '05/04/2026', status: 'compareceu' }
]

const formatarData = (data) => {
  const d = new Date(data + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })
}

const agendamentosFiltrados = computed(() => {
  if (filtroAtivo.value === 'todos') return agendamentos
  return agendamentos.filter(a => a.tipo === filtroAtivo.value)
})
</script>

<template>
  <PainelLayout>
    <div class="conteudo">
      <h1>Agendamentos</h1>
      <p class="subtitulo">3 compromissos confirmados</p>

      <!-- Filtros -->
      <div class="filtros">
        <button
          :class="['chip', { ativo: filtroAtivo === 'todos' }]"
          @click="filtroAtivo = 'todos'"
        >
          Todos
        </button>
        <button
          :class="['chip', { ativo: filtroAtivo === 'vara' }]"
          @click="filtroAtivo = 'vara'"
        >
          Vara
        </button>
        <button
          :class="['chip', { ativo: filtroAtivo === 'instituicao' }]"
          @click="filtroAtivo = 'instituicao'"
        >
          Instituição
        </button>
      </div>

      <!-- Próximos -->
      <p class="bloco-titulo">PRÓXIMOS COMPROMISSOS</p>
      <div class="lista">
        <div v-for="ag in agendamentosFiltrados" :key="ag.id" class="card-agendamento">
          <div class="data-box">
            <span class="dia">{{ new Date(ag.data + 'T00:00:00').getDate() }}</span>
            <span class="mes">{{ new Date(ag.data + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' }).replace('.','') }}</span>
            <span class="dia-semana">{{ ag.diaSemana }}</span>
          </div>
          <div class="info">
            <div class="info-header">
              <div :class="['icone-tipo', `cor-${ag.cor}`]">
                <i :class="['ti', ag.icone]"></i>
              </div>
              <h3>{{ ag.titulo }}</h3>
              <span class="badge-status">Confirmado</span>
            </div>
            <p class="local"><i class="ti ti-map-pin"></i> {{ ag.local }}</p>
            <p class="endereco">{{ ag.endereco }}</p>
            <p class="horario"><i class="ti ti-clock"></i> {{ ag.horario }}</p>
          </div>
        </div>
      </div>

      <!-- Histórico -->
      <p class="bloco-titulo">HISTÓRICO</p>
      <div class="historico">
        <div v-for="(item, idx) in historico" :key="idx" class="hist-item">
          <i class="ti ti-circle-check"></i>
          <div class="hist-info">
            <p class="hist-titulo">{{ item.titulo }}</p>
            <p class="hist-meta">{{ item.local }} · {{ item.data }}</p>
          </div>
          <span class="hist-tag">Compareceu</span>
        </div>
      </div>
    </div>
  </PainelLayout>
</template>

<style scoped>
.conteudo { max-width: 880px; }

h1 { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
.subtitulo {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}

/* filtros */
.filtros {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}
.chip {
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  transition: all 0.15s;
}
.chip:hover { border-color: var(--color-border-strong); }
.chip.ativo {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.bloco-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin: 28px 0 12px;
}
.bloco-titulo:first-of-type { margin-top: 0; }

/* cards agendamento */
.lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card-agendamento {
  display: flex;
  gap: 18px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 18px 20px;
  transition: all 0.15s;
}
.card-agendamento:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-sm);
}

.data-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  flex-shrink: 0;
  padding: 8px 0;
  border-right: 1px solid var(--color-border);
}
.data-box .dia {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}
.data-box .mes {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-top: 4px;
  font-weight: 500;
}
.data-box .dia-semana {
  font-size: 10px;
  color: var(--color-text-tertiary);
  margin-top: 4px;
}

.info { flex: 1; }
.info-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.icone-tipo {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
}
.cor-azul { background: var(--color-primary-soft); color: var(--color-primary); }
.cor-verde { background: var(--color-success-soft); color: var(--color-success); }
.cor-roxo { background: #EEEDFE; color: #5448A6; }

.info h3 {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
}
.badge-status {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--color-success-soft);
  color: var(--color-success);
  font-weight: 500;
}

.local, .endereco, .horario {
  font-size: 13px;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}
.local .ti, .horario .ti {
  font-size: 14px;
  color: var(--color-text-tertiary);
}
.endereco {
  padding-left: 20px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* histórico */
.historico {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.hist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  background: var(--color-bg);
}
.hist-item > .ti {
  font-size: 18px;
  color: var(--color-success);
  flex-shrink: 0;
}
.hist-info { flex: 1; }
.hist-titulo {
  font-size: 13px;
  font-weight: 500;
}
.hist-meta {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}
.hist-tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--color-success-soft);
  color: var(--color-success);
  font-weight: 500;
}
</style>
