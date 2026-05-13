<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InstituicaoLayout from '@/components/InstituicaoLayout.vue'

const router = useRouter()
const filtroAtivo = ref('todas')

const visitas = [
  {
    id: 1,
    data: '14/05/2026',
    diaSemana: 'Quinta',
    horario: '14h às 16h',
    adotante: 'Maria Silva',
    processo: '2026-001847',
    tipo: '1ª visita de aproximação',
    status: 'agendada',
    podeRegistrarRelatorio: false
  },
  {
    id: 2,
    data: '17/05/2026',
    diaSemana: 'Domingo',
    horario: '10h às 12h',
    adotante: 'João e Ana Lima',
    processo: '2026-001902',
    tipo: '3ª visita de aproximação',
    status: 'agendada',
    podeRegistrarRelatorio: false
  },
  {
    id: 3,
    data: '08/05/2026',
    diaSemana: 'Quinta',
    horario: '14h às 16h',
    adotante: 'Carla Souza',
    processo: '2025-003012',
    tipo: 'Acompanhamento de convivência',
    status: 'realizada',
    podeRegistrarRelatorio: true
  },
  {
    id: 4,
    data: '05/05/2026',
    diaSemana: 'Segunda',
    horario: '15h às 17h',
    adotante: 'Maria Silva',
    processo: '2026-001847',
    tipo: 'Visita preliminar',
    status: 'realizada',
    podeRegistrarRelatorio: false
  }
]

const proximas = visitas.filter(v => v.status === 'agendada')
const realizadas = visitas.filter(v => v.status === 'realizada')

const irParaRelatorio = (v) => {
  router.push(`/instituicao/visitas/${v.id}/relatorio`)
}
</script>

<template>
  <InstituicaoLayout>
    <div class="conteudo">
      <div class="cabecalho">
        <div>
          <h1>Agenda de visitas</h1>
          <p class="subtitulo">{{ proximas.length }} próximas · {{ realizadas.length }} realizadas</p>
        </div>
        <button class="btn btn-primary">
          <i class="ti ti-calendar-plus"></i>
          Nova visita
        </button>
      </div>

      <!-- Próximas -->
      <p class="bloco-titulo">PRÓXIMAS VISITAS</p>
      <div class="lista">
        <div v-for="v in proximas" :key="v.id" class="visita-card">
          <div class="data-box">
            <span class="dia">{{ v.data.split('/')[0] }}</span>
            <span class="mes">{{ ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'][parseInt(v.data.split('/')[1]) - 1] }}</span>
            <span class="dia-semana">{{ v.diaSemana }}</span>
          </div>
          <div class="info">
            <div class="info-header">
              <h3>{{ v.adotante }}</h3>
              <span class="badge agendada">Agendada</span>
            </div>
            <p class="tipo-visita">{{ v.tipo }}</p>
            <div class="meta">
              <span><i class="ti ti-clock"></i> {{ v.horario }}</span>
              <span><i class="ti ti-file-text"></i> Processo {{ v.processo }}</span>
            </div>
          </div>
          <div class="acoes-card">
            <button class="btn btn-ghost btn-pequeno">
              <i class="ti ti-message-circle"></i>
              Reagendar
            </button>
          </div>
        </div>
      </div>

      <!-- Realizadas -->
      <p class="bloco-titulo">REALIZADAS</p>
      <div class="lista">
        <div v-for="v in realizadas" :key="v.id" class="visita-card realizada">
          <div class="data-box">
            <span class="dia">{{ v.data.split('/')[0] }}</span>
            <span class="mes">{{ ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'][parseInt(v.data.split('/')[1]) - 1] }}</span>
            <span class="dia-semana">{{ v.diaSemana }}</span>
          </div>
          <div class="info">
            <div class="info-header">
              <h3>{{ v.adotante }}</h3>
              <span :class="['badge', v.podeRegistrarRelatorio ? 'pendente' : 'concluida']">
                {{ v.podeRegistrarRelatorio ? 'Aguardando relatório' : 'Relatório enviado' }}
              </span>
            </div>
            <p class="tipo-visita">{{ v.tipo }}</p>
            <div class="meta">
              <span><i class="ti ti-clock"></i> {{ v.horario }}</span>
              <span><i class="ti ti-file-text"></i> Processo {{ v.processo }}</span>
            </div>
          </div>
          <div class="acoes-card">
            <button
              v-if="v.podeRegistrarRelatorio"
              class="btn btn-primary btn-pequeno"
              @click="irParaRelatorio(v)"
            >
              <i class="ti ti-edit"></i>
              Registrar relatório
            </button>
            <button v-else class="btn btn-ghost btn-pequeno">
              <i class="ti ti-eye"></i>
              Ver relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  </InstituicaoLayout>
</template>

<style scoped>
.conteudo { max-width: 1000px; }

.cabecalho {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
h1 { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
.subtitulo {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.bloco-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin: 28px 0 12px;
}
.bloco-titulo:first-of-type { margin-top: 0; }

.lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.visita-card {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 18px 20px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.15s;
}
.visita-card:hover {
  border-color: var(--color-border-strong);
}
.visita-card.realizada {
  background: var(--color-bg-soft);
}

.data-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  padding: 4px 0;
  border-right: 1px solid var(--color-border);
  flex-shrink: 0;
}
.data-box .dia {
  font-size: 26px;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}
.visita-card.realizada .data-box .dia { color: var(--color-text-tertiary); }
.data-box .mes {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-top: 4px;
  font-weight: 500;
  letter-spacing: 0.5px;
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
  margin-bottom: 6px;
}
.info h3 {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
}
.badge {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 500;
}
.badge.agendada {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
.badge.pendente {
  background: var(--color-warning-soft);
  color: var(--color-warning);
}
.badge.concluida {
  background: var(--color-success-soft);
  color: var(--color-success);
}

.tipo-visita {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}
.meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}
.meta .ti {
  font-size: 13px;
  margin-right: 4px;
  vertical-align: -1px;
}

.acoes-card {
  flex-shrink: 0;
}
.btn-pequeno {
  font-size: 12px;
  padding: 7px 13px;
}
</style>
