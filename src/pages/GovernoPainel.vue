<script setup>
import { useRouter } from 'vue-router'
import GovernoLayout from '@/components/GovernoLayout.vue'

const router = useRouter()

const kpis = [
  { titulo: 'Processos ativos', valor: '312', variacao: '+8', tendencia: 'sobe', icone: 'ti-users', cor: 'azul' },
  { titulo: 'Em fila de espera', valor: '187', variacao: '+12', tendencia: 'sobe', icone: 'ti-hourglass', cor: 'ambar' },
  { titulo: 'Em aproximação', valor: '24', variacao: '+3', tendencia: 'sobe', icone: 'ti-heart-handshake', cor: 'verde' },
  { titulo: 'Adoções no ano', valor: '18', variacao: '+2', tendencia: 'sobe', icone: 'ti-check', cor: 'roxo' }
]

const alertas = [
  { tipo: 'urgente', titulo: 'Maria Silva — documento vencido', detalhe: 'Atestado de sanidade mental precisa ser reapresentado.', acao: 'Ver processo', rota: '/governo/adotantes/1' },
  { tipo: 'alerta', titulo: 'Lar Nossa Senhora — lotado', detalhe: '40 de 40 vagas ocupadas. Considere redistribuir.', acao: 'Ver instituições', rota: '/governo/instituicoes' },
  { tipo: 'info', titulo: '5 visitas marcadas para amanhã', detalhe: 'Acompanhe a agenda das instituições.', acao: 'Ver agenda', rota: '/governo/instituicoes' }
]

const proximos = [
  { hora: '09h', adotante: 'Paulo Mendes', tipo: 'Entrevista psicológica', status: 'confirmado' },
  { hora: '10h30', adotante: 'Carla Souza', tipo: 'Audiência de adoção', status: 'confirmado' },
  { hora: '14h', adotante: 'Roberto e Helena Cunha', tipo: 'Entrega de documentação', status: 'pendente' },
  { hora: '16h', adotante: 'Maria Silva', tipo: 'Revisão de checklist', status: 'confirmado' }
]
</script>

<template>
  <GovernoLayout>
    <div class="conteudo">
      <div class="cabecalho">
        <div>
          <h1>Bom dia, Carlos</h1>
          <p class="subtitulo">Vara da Infância — Recife · 12 de maio de 2026</p>
        </div>
        <div class="acoes-cabecalho">
          <button class="btn btn-ghost"><i class="ti ti-calendar"></i> Hoje</button>
          <button class="btn btn-primary"><i class="ti ti-plus"></i> Nova ação</button>
        </div>
      </div>

      <!-- KPIs -->
      <div class="kpis">
        <div v-for="(kpi, idx) in kpis" :key="idx" class="kpi-card">
          <div :class="['kpi-icone', `cor-${kpi.cor}`]">
            <i :class="['ti', kpi.icone]"></i>
          </div>
          <div class="kpi-info">
            <p class="kpi-titulo">{{ kpi.titulo }}</p>
            <p class="kpi-valor">{{ kpi.valor }}</p>
            <p class="kpi-variacao">
              <i class="ti ti-trending-up"></i>
              {{ kpi.variacao }} este mês
            </p>
          </div>
        </div>
      </div>

      <div class="grid-duplo">
        <!-- Alertas -->
        <section class="bloco">
          <div class="bloco-header">
            <h2>Alertas e ações</h2>
            <a class="bloco-link">Ver todos</a>
          </div>
          <div class="alertas">
            <div v-for="(alerta, idx) in alertas" :key="idx" :class="['alerta-card', `tipo-${alerta.tipo}`]">
              <i :class="['ti', alerta.tipo === 'urgente' ? 'ti-alert-octagon' : alerta.tipo === 'alerta' ? 'ti-alert-triangle' : 'ti-info-circle']"></i>
              <div class="alerta-info">
                <p class="alerta-titulo">{{ alerta.titulo }}</p>
                <p class="alerta-detalhe">{{ alerta.detalhe }}</p>
              </div>
              <button class="btn-link" @click="router.push(alerta.rota)">{{ alerta.acao }}</button>
            </div>
          </div>
        </section>

        <!-- Agenda do dia -->
        <section class="bloco">
          <div class="bloco-header">
            <h2>Agenda de hoje</h2>
            <a class="bloco-link">Ver semana</a>
          </div>
          <div class="agenda">
            <div v-for="(item, idx) in proximos" :key="idx" class="agenda-item">
              <span class="agenda-hora">{{ item.hora }}</span>
              <div class="agenda-info">
                <p class="agenda-adotante">{{ item.adotante }}</p>
                <p class="agenda-tipo">{{ item.tipo }}</p>
              </div>
              <span :class="['agenda-status', `st-${item.status}`]">
                {{ item.status === 'confirmado' ? 'Confirmado' : 'Pendente' }}
              </span>
            </div>
          </div>
        </section>
      </div>

      <!-- Atalhos -->
      <section class="atalhos">
        <h2>Atalhos rápidos</h2>
        <div class="atalhos-grid">
          <button class="atalho" @click="router.push('/governo/adotantes')">
            <i class="ti ti-users"></i>
            <span>Adotantes</span>
            <p>Buscar e gerenciar processos</p>
          </button>
          <button class="atalho" @click="router.push('/governo/instituicoes')">
            <i class="ti ti-building"></i>
            <span>Instituições</span>
            <p>Monitorar lotação dos lares</p>
          </button>
        </div>
      </section>
    </div>
  </GovernoLayout>
</template>

<style scoped>
.conteudo { max-width: 1140px; }

.cabecalho {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
h1 { font-size: 26px; font-weight: 600; margin-bottom: 4px; }
.subtitulo { font-size: 14px; color: var(--color-text-secondary); }
.acoes-cabecalho { display: flex; gap: 8px; }

/* KPIs */
.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}
.kpi-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 16px;
}
.kpi-icone {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.cor-azul { background: var(--color-primary-soft); color: var(--color-primary); }
.cor-ambar { background: var(--color-warning-soft); color: var(--color-warning); }
.cor-verde { background: var(--color-success-soft); color: var(--color-success); }
.cor-roxo { background: #EEEDFE; color: #5448A6; }

.kpi-info { flex: 1; }
.kpi-titulo {
  font-size: 12px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}
.kpi-valor {
  font-size: 24px;
  font-weight: 600;
  margin-top: 4px;
}
.kpi-variacao {
  font-size: 11px;
  color: var(--color-success);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Grid duplo */
.grid-duplo {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}
.bloco {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 18px;
}
.bloco-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.bloco h2 { font-size: 15px; font-weight: 600; }
.bloco-link {
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
}

/* alertas */
.alertas { display: flex; flex-direction: column; gap: 8px; }
.alerta-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  border: 1px solid;
}
.alerta-card .ti {
  font-size: 18px;
  flex-shrink: 0;
}
.tipo-urgente { background: var(--color-danger-soft); border-color: #F7C1C1; }
.tipo-urgente .ti { color: var(--color-danger); }
.tipo-alerta { background: var(--color-warning-soft); border-color: #F5D9A8; }
.tipo-alerta .ti { color: var(--color-warning); }
.tipo-info { background: var(--color-primary-soft); border-color: var(--color-primary-border); }
.tipo-info .ti { color: var(--color-primary); }

.alerta-info { flex: 1; min-width: 0; }
.alerta-titulo { font-size: 13px; font-weight: 600; }
.alerta-detalhe { font-size: 12px; color: var(--color-text-secondary); margin-top: 2px; }
.btn-link {
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 500;
  flex-shrink: 0;
  cursor: pointer;
}
.btn-link:hover { text-decoration: underline; }

/* agenda */
.agenda { display: flex; flex-direction: column; gap: 1px; background: var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.agenda-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--color-bg);
}
.agenda-hora {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  min-width: 42px;
}
.agenda-info { flex: 1; min-width: 0; }
.agenda-adotante { font-size: 13px; font-weight: 500; }
.agenda-tipo { font-size: 11px; color: var(--color-text-tertiary); margin-top: 2px; }
.agenda-status {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 500;
}
.st-confirmado { background: var(--color-success-soft); color: var(--color-success); }
.st-pendente { background: var(--color-warning-soft); color: var(--color-warning); }

/* atalhos */
.atalhos h2 { font-size: 15px; font-weight: 600; margin-bottom: 12px; }
.atalhos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.atalho {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 16px;
  text-align: left;
  transition: all 0.15s;
}
.atalho:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
.atalho .ti { font-size: 22px; color: var(--color-primary); margin-bottom: 10px; display: block; }
.atalho span { display: block; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.atalho p { font-size: 12px; color: var(--color-text-tertiary); }
</style>
