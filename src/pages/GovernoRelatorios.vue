<script setup>
import { ref, computed } from 'vue'
import GovernoLayout from '@/components/GovernoLayout.vue'

const periodoAtivo = ref('12m')

const periodos = [
  { id: '30d', label: '30 dias' },
  { id: '3m', label: '3 meses' },
  { id: '12m', label: '12 meses' },
  { id: 'ano', label: 'Ano atual' }
]

// Adoções concluídas por mês (últimos 12 meses)
const adocoesPorMes = [
  { mes: 'Jun', valor: 1 }, { mes: 'Jul', valor: 2 }, { mes: 'Ago', valor: 1 },
  { mes: 'Set', valor: 3 }, { mes: 'Out', valor: 2 }, { mes: 'Nov', valor: 2 },
  { mes: 'Dez', valor: 1 }, { mes: 'Jan', valor: 4 }, { mes: 'Fev', valor: 2 },
  { mes: 'Mar', valor: 3 }, { mes: 'Abr', valor: 5 }, { mes: 'Mai', valor: 2 }
]

const maxAdocoes = computed(() => Math.max(...adocoesPorMes.map(d => d.valor)))

// Tempo médio em cada etapa (em meses)
const temposPorEtapa = [
  { etapa: 'Documentação', meses: 2.4, cor: '#79BCEA' },
  { etapa: 'Avaliação técnica', meses: 3.1, cor: '#9DC25A' },
  { etapa: 'Curso de preparação', meses: 4.2, cor: '#F2C94C' },
  { etapa: 'Habilitação', meses: 1.8, cor: '#F18AAE' },
  { etapa: 'Fila / aproximação', meses: 14.3, cor: '#5448A6' }
]

const maxMeses = computed(() => Math.max(...temposPorEtapa.map(t => t.meses)))

// Perfis de adoção mais frequentes
const perfis = [
  { faixa: '0 a 3 anos', percentual: 62, cor: '#F18AAE' },
  { faixa: '4 a 7 anos', percentual: 24, cor: '#F2C94C' },
  { faixa: '8 a 11 anos', percentual: 9, cor: '#9DC25A' },
  { faixa: '12 anos ou mais', percentual: 3, cor: '#79BCEA' },
  { faixa: 'Grupos de irmãos', percentual: 2, cor: '#5448A6' }
]

// Lista de relatórios pré-gerados
const relatoriosDisponiveis = [
  { titulo: 'Relatório mensal — abril/2026', tipo: 'mensal', gerado: '01/05/2026', tamanho: '2.4 MB' },
  { titulo: 'Estatísticas anuais — 2025', tipo: 'anual', gerado: '15/01/2026', tamanho: '8.1 MB' },
  { titulo: 'Auditoria de processos — 1º tri 2026', tipo: 'auditoria', gerado: '12/04/2026', tamanho: '3.7 MB' },
  { titulo: 'Tempo de fila por perfil', tipo: 'analise', gerado: '03/05/2026', tamanho: '1.2 MB' }
]

const exportar = (tipo) => {
  alert(`Exportando relatório ${tipo} como PDF...`)
}
</script>

<template>
  <GovernoLayout>
    <div class="conteudo">
      <div class="cabecalho">
        <div>
          <h1>Relatórios e estatísticas</h1>
          <p class="subtitulo">Visão consolidada dos processos da comarca</p>
        </div>
        <div class="periodos">
          <button
            v-for="p in periodos"
            :key="p.id"
            :class="['periodo-btn', { ativo: periodoAtivo === p.id }]"
            @click="periodoAtivo = p.id"
          >
            {{ p.label }}
          </button>
        </div>
      </div>

      <!-- Resumo numérico -->
      <div class="resumo">
        <div class="resumo-card">
          <p class="resumo-label">Adoções concluídas</p>
          <p class="resumo-valor">28</p>
          <p class="resumo-tendencia positiva"><i class="ti ti-trending-up"></i> +14% vs ano anterior</p>
        </div>
        <div class="resumo-card">
          <p class="resumo-label">Tempo médio total</p>
          <p class="resumo-valor">25,8 meses</p>
          <p class="resumo-tendencia negativa"><i class="ti ti-trending-down"></i> -2,1 meses</p>
        </div>
        <div class="resumo-card">
          <p class="resumo-label">Taxa de desistência</p>
          <p class="resumo-valor">8,4%</p>
          <p class="resumo-tendencia neutra"><i class="ti ti-minus"></i> estável</p>
        </div>
        <div class="resumo-card">
          <p class="resumo-label">Novas habilitações</p>
          <p class="resumo-valor">52</p>
          <p class="resumo-tendencia positiva"><i class="ti ti-trending-up"></i> +8%</p>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="graficos">
        <!-- Adoções por mês -->
        <section class="grafico-card">
          <div class="grafico-header">
            <h2>Adoções concluídas por mês</h2>
            <button class="btn btn-ghost btn-export" @click="exportar('adocoes-mes')">
              <i class="ti ti-download"></i> Exportar
            </button>
          </div>
          <div class="barras">
            <div v-for="dado in adocoesPorMes" :key="dado.mes" class="barra-coluna">
              <div class="barra-wrapper">
                <div
                  class="barra"
                  :style="{ height: (dado.valor / maxAdocoes * 100) + '%' }"
                >
                  <span class="barra-valor">{{ dado.valor }}</span>
                </div>
              </div>
              <span class="barra-label">{{ dado.mes }}</span>
            </div>
          </div>
        </section>

        <!-- Tempo médio por etapa -->
        <section class="grafico-card">
          <div class="grafico-header">
            <h2>Tempo médio por etapa</h2>
            <button class="btn btn-ghost btn-export" @click="exportar('tempo-etapa')">
              <i class="ti ti-download"></i> Exportar
            </button>
          </div>
          <div class="barras-horizontais">
            <div v-for="etapa in temposPorEtapa" :key="etapa.etapa" class="barra-h-linha">
              <span class="barra-h-label">{{ etapa.etapa }}</span>
              <div class="barra-h-track">
                <div
                  class="barra-h-fill"
                  :style="{ width: (etapa.meses / maxMeses * 100) + '%', background: etapa.cor }"
                ></div>
              </div>
              <span class="barra-h-valor">{{ etapa.meses }} meses</span>
            </div>
          </div>
        </section>
      </div>

      <!-- Perfis -->
      <section class="grafico-card">
        <div class="grafico-header">
          <h2>Perfil das adoções concluídas</h2>
          <button class="btn btn-ghost btn-export" @click="exportar('perfis')">
            <i class="ti ti-download"></i> Exportar
          </button>
        </div>
        <div class="perfis">
          <div class="barra-empilhada">
            <div
              v-for="perfil in perfis"
              :key="perfil.faixa"
              class="segmento"
              :style="{ width: perfil.percentual + '%', background: perfil.cor }"
              :title="`${perfil.faixa}: ${perfil.percentual}%`"
            ></div>
          </div>
          <div class="legenda">
            <div v-for="perfil in perfis" :key="perfil.faixa" class="legenda-item">
              <span class="legenda-cor" :style="{ background: perfil.cor }"></span>
              <span class="legenda-label">{{ perfil.faixa }}</span>
              <span class="legenda-valor">{{ perfil.percentual }}%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Relatórios prontos -->
      <section class="grafico-card">
        <div class="grafico-header">
          <h2>Relatórios disponíveis</h2>
        </div>
        <div class="rel-lista">
          <div v-for="rel in relatoriosDisponiveis" :key="rel.titulo" class="rel-item">
            <div class="rel-icone"><i class="ti ti-file-text"></i></div>
            <div class="rel-info">
              <p class="rel-titulo">{{ rel.titulo }}</p>
              <p class="rel-meta">Gerado em {{ rel.gerado }} · {{ rel.tamanho }}</p>
            </div>
            <button class="btn btn-ghost btn-baixar" @click="exportar(rel.titulo)">
              <i class="ti ti-download"></i> Baixar
            </button>
          </div>
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
h1 { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
.subtitulo { font-size: 14px; color: var(--color-text-secondary); }

.periodos {
  display: flex;
  gap: 4px;
  background: var(--color-bg-soft);
  padding: 4px;
  border-radius: var(--radius-md);
}
.periodo-btn {
  padding: 7px 14px;
  font-size: 13px;
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-weight: 500;
}
.periodo-btn.ativo {
  background: var(--color-bg);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

/* resumo */
.resumo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}
.resumo-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 16px;
}
.resumo-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}
.resumo-valor {
  font-size: 28px;
  font-weight: 600;
  margin: 6px 0 4px;
}
.resumo-tendencia {
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.resumo-tendencia.positiva { color: var(--color-success); }
.resumo-tendencia.negativa { color: var(--color-primary); }
.resumo-tendencia.neutra { color: var(--color-text-tertiary); }

/* gráficos */
.graficos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.grafico-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 18px;
  margin-bottom: 16px;
}
.grafico-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.grafico-card h2 { font-size: 15px; font-weight: 600; }
.btn-export { padding: 6px 12px; font-size: 12px; }

/* barras verticais */
.barras {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 180px;
  padding-top: 24px;
}
.barra-coluna {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.barra-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.barra {
  width: 100%;
  background: var(--color-primary);
  border-radius: 4px 4px 0 0;
  position: relative;
  min-height: 4px;
  transition: height 0.3s;
}
.barra-valor {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-secondary);
}
.barra-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 6px;
}

/* barras horizontais */
.barras-horizontais { display: flex; flex-direction: column; gap: 10px; }
.barra-h-linha {
  display: grid;
  grid-template-columns: 140px 1fr 80px;
  gap: 12px;
  align-items: center;
}
.barra-h-label {
  font-size: 12px;
  color: var(--color-text-secondary);
}
.barra-h-track {
  height: 22px;
  background: var(--color-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}
.barra-h-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s;
}
.barra-h-valor {
  font-size: 12px;
  font-weight: 600;
  text-align: right;
}

/* barra empilhada */
.barra-empilhada {
  display: flex;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 16px;
}
.segmento {
  height: 100%;
  transition: opacity 0.15s;
}
.segmento:hover { opacity: 0.85; }
.legenda {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
}
.legenda-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}
.legenda-cor {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
.legenda-label { color: var(--color-text-secondary); }
.legenda-valor { font-weight: 600; }

/* relatórios prontos */
.rel-lista { display: flex; flex-direction: column; gap: 1px; background: var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.rel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--color-bg);
}
.rel-icone {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.rel-info { flex: 1; }
.rel-titulo { font-size: 13px; font-weight: 600; }
.rel-meta { font-size: 11px; color: var(--color-text-tertiary); margin-top: 2px; }
.btn-baixar { padding: 6px 12px; font-size: 12px; }
</style>
