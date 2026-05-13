<script setup>
import { ref, computed } from 'vue'
import PainelLayout from '@/components/PainelLayout.vue'

const filtroAtivo = ref('todas')

const notificacoes = ref([
  {
    id: 1,
    titulo: 'Visita agendada para 14/05',
    mensagem: 'A instituição Lar Pequeno Príncipe confirmou sua primeira visita de aproximação para 14/05/2026, das 14h às 16h.',
    quando: 'Há 2 horas',
    origem: 'Lar Pequeno Príncipe',
    tipo: 'instituicao',
    icone: 'ti-calendar-event',
    cor: 'azul',
    lida: false,
    grupo: 'hoje'
  },
  {
    id: 2,
    titulo: 'Documento aprovado',
    mensagem: 'Seu atestado de sanidade mental foi marcado como entregue pela Vara da Infância.',
    quando: 'Há 5 horas',
    origem: 'Vara da Infância — Recife',
    tipo: 'vara',
    icone: 'ti-circle-check',
    cor: 'verde',
    lida: false,
    grupo: 'hoje'
  },
  {
    id: 3,
    titulo: 'Documento pendente',
    mensagem: 'Falta entregar o laudo psicológico. Compareça à vara com o original em até 30 dias.',
    quando: '3 dias atrás',
    origem: 'Vara da Infância — Recife',
    tipo: 'vara',
    icone: 'ti-alert-triangle',
    cor: 'amarelo',
    lida: false,
    grupo: 'semana'
  },
  {
    id: 4,
    titulo: 'Curso de preparação confirmado',
    mensagem: 'Você foi inscrita na turma de junho/2025 do curso obrigatório.',
    quando: '5 dias atrás',
    origem: 'Vara da Infância — Recife',
    tipo: 'vara',
    icone: 'ti-school',
    cor: 'azul',
    lida: true,
    grupo: 'semana'
  },
  {
    id: 5,
    titulo: 'Habilitação aprovada',
    mensagem: 'Seu processo de habilitação foi aprovado. Você agora está na fila de espera.',
    quando: '15/09/2025',
    origem: 'Vara da Infância — Recife',
    tipo: 'vara',
    icone: 'ti-circle-check',
    cor: 'verde',
    lida: true,
    grupo: 'semana'
  }
])

const naoLidas = computed(() => notificacoes.value.filter(n => !n.lida).length)

const filtradas = computed(() => {
  if (filtroAtivo.value === 'todas') return notificacoes.value
  if (filtroAtivo.value === 'nao-lidas') return notificacoes.value.filter(n => !n.lida)
  return notificacoes.value.filter(n => n.tipo === filtroAtivo.value)
})

const grupos = computed(() => {
  const hoje = filtradas.value.filter(n => n.grupo === 'hoje')
  const semana = filtradas.value.filter(n => n.grupo === 'semana')
  return [
    { titulo: 'HOJE', itens: hoje },
    { titulo: 'ESTA SEMANA', itens: semana }
  ].filter(g => g.itens.length > 0)
})

const marcarTodasComoLidas = () => {
  notificacoes.value.forEach(n => n.lida = true)
}
</script>

<template>
  <PainelLayout>
    <div class="conteudo">
      <div class="cabecalho">
        <div>
          <h1>Notificações</h1>
          <p class="subtitulo">{{ naoLidas }} não lidas · {{ notificacoes.length }} no total</p>
        </div>
        <button class="btn btn-ghost" @click="marcarTodasComoLidas" :disabled="naoLidas === 0">
          <i class="ti ti-checks"></i>
          Marcar todas como lidas
        </button>
      </div>

      <!-- Filtros -->
      <div class="filtros">
        <button :class="['chip', { ativo: filtroAtivo === 'todas' }]" @click="filtroAtivo = 'todas'">
          Todas
        </button>
        <button :class="['chip', { ativo: filtroAtivo === 'nao-lidas' }]" @click="filtroAtivo = 'nao-lidas'">
          Não lidas
        </button>
        <button :class="['chip', { ativo: filtroAtivo === 'vara' }]" @click="filtroAtivo = 'vara'">
          Da Vara
        </button>
        <button :class="['chip', { ativo: filtroAtivo === 'instituicao' }]" @click="filtroAtivo = 'instituicao'">
          Da Instituição
        </button>
      </div>

      <!-- Grupos -->
      <div v-for="grupo in grupos" :key="grupo.titulo" class="grupo">
        <p class="grupo-titulo">{{ grupo.titulo }}</p>
        <div class="lista">
          <div
            v-for="n in grupo.itens"
            :key="n.id"
            :class="['notif-card', { nao_lida: !n.lida }]"
          >
            <span v-if="!n.lida" class="ponto-nao-lido"></span>
            <div :class="['notif-icone', `cor-${n.cor}`]">
              <i :class="['ti', n.icone]"></i>
            </div>
            <div class="notif-info">
              <p class="notif-titulo">{{ n.titulo }}</p>
              <p class="notif-mensagem">{{ n.mensagem }}</p>
              <p class="notif-meta">{{ n.quando }} · {{ n.origem }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filtradas.length === 0" class="vazio">
        <i class="ti ti-inbox"></i>
        <p>Nenhuma notificação por aqui.</p>
      </div>
    </div>
  </PainelLayout>
</template>

<style scoped>
.conteudo { max-width: 880px; }

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
  margin-bottom: 24px;
  flex-wrap: wrap;
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

/* grupos */
.grupo { margin-bottom: 24px; }
.grupo-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.lista {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.notif-card {
  display: flex;
  gap: 14px;
  padding: 14px 18px;
  background: var(--color-bg);
  position: relative;
}
.notif-card.nao_lida {
  background: var(--color-primary-soft);
}

.ponto-nao-lido {
  position: absolute;
  left: 8px;
  top: 22px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}

.notif-icone {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  margin-left: 8px;
}
.cor-azul { background: var(--color-primary-soft); color: var(--color-primary); }
.notif-card.nao_lida .cor-azul { background: var(--color-bg); }
.cor-verde { background: var(--color-success-soft); color: var(--color-success); }
.cor-amarelo { background: var(--color-warning-soft); color: var(--color-warning); }

.notif-info { flex: 1; min-width: 0; }
.notif-titulo {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}
.notif-mensagem {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 8px;
}
.notif-meta {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.vazio {
  text-align: center;
  padding: 48px 24px;
  color: var(--color-text-tertiary);
}
.vazio .ti { font-size: 36px; margin-bottom: 8px; }
.vazio p { font-size: 14px; }

button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
