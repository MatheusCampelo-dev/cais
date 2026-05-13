<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InstituicaoLayout from '@/components/InstituicaoLayout.vue'

const router = useRouter()

const dadosVisita = {
  processo: '2026-001847',
  adotante: 'Maria Silva',
  data: '14/05/2026 · 14h às 16h',
  visita: '1ª de aproximação'
}

const criterios = ref([
  {
    nome: 'Vínculo afetivo',
    opcoes: ['Frágil', 'Em formação', 'Bom'],
    selecionada: 'Bom'
  },
  {
    nome: 'Comunicação',
    opcoes: ['Difícil', 'Adequada', 'Excelente'],
    selecionada: 'Adequada'
  },
  {
    nome: 'Adaptação ao ambiente',
    opcoes: ['Resistente', 'Cautelosa', 'Confortável'],
    selecionada: 'Cautelosa'
  }
])

const parecer = ref('A primeira visita ocorreu em ambiente reservado, com presença da equipe técnica. A aproximação ocorreu de forma gradual e respeitosa, com a adotante demonstrando paciência diante da reação inicialmente cautelosa. Recomenda-se manter o cronograma de visitas semanais.')

const recomendacoes = [
  { id: 'prosseguir', label: 'Prosseguir para próxima visita', tipo: 'positivo' },
  { id: 'acompanhamento', label: 'Solicitar acompanhamento adicional da equipe técnica', tipo: 'neutro' },
  { id: 'interromper', label: 'Sugerir interrupção do estágio de aproximação', tipo: 'negativo' }
]

const recomendacaoSelecionada = ref('prosseguir')

const selecionarCriterio = (idx, opcao) => {
  criterios.value[idx].selecionada = opcao
}

const obterClasseCriterio = (criterio, opcao) => {
  if (criterio.selecionada !== opcao) return ''
  const idx = criterio.opcoes.indexOf(opcao)
  if (idx === 0) return 'pill-vermelho'
  if (idx === 1) return 'pill-amarelo'
  return 'pill-verde'
}

const salvarRascunho = () => {
  alert('Rascunho salvo.')
}

const enviarAVara = () => {
  alert('Relatório enviado à Vara.')
  router.push('/instituicao/visitas')
}
</script>

<template>
  <InstituicaoLayout>
    <div class="conteudo">
      <button class="voltar" @click="router.push('/instituicao/visitas')" type="button">
        <i class="ti ti-arrow-left"></i>
        Agenda de visitas
      </button>

      <h1>Relatório da visita</h1>
      <p class="subtitulo">Registre o parecer técnico após a aproximação. O texto será encaminhado à Vara da Infância.</p>

      <!-- Cabeçalho da visita -->
      <div class="resumo-visita">
        <div><span class="resumo-label">Processo</span> · <strong>{{ dadosVisita.processo }}</strong></div>
        <div><span class="resumo-label">Adotante</span> · <strong>{{ dadosVisita.adotante }}</strong></div>
        <div><span class="resumo-label">Data</span> · <strong>{{ dadosVisita.data }}</strong></div>
        <div><span class="resumo-label">Visita</span> · <strong>{{ dadosVisita.visita }}</strong></div>
      </div>

      <!-- Critérios -->
      <p class="bloco-titulo">CRITÉRIOS OBSERVADOS</p>
      <div class="criterios-grid">
        <div v-for="(crit, idx) in criterios" :key="idx" class="criterio-card">
          <p class="criterio-nome">{{ crit.nome }}</p>
          <div class="pills">
            <button
              v-for="opcao in crit.opcoes"
              :key="opcao"
              :class="['pill', obterClasseCriterio(crit, opcao)]"
              @click="selecionarCriterio(idx, opcao)"
              type="button"
            >
              {{ opcao }}
            </button>
          </div>
        </div>
      </div>

      <!-- Parecer descritivo -->
      <p class="bloco-titulo">PARECER DESCRITIVO</p>
      <textarea v-model="parecer" class="textarea" rows="6"></textarea>

      <!-- Recomendação à Vara -->
      <p class="bloco-titulo">RECOMENDAÇÃO À VARA</p>
      <div class="recomendacoes">
        <label
          v-for="rec in recomendacoes"
          :key="rec.id"
          :class="['rec-opcao', { selecionada: recomendacaoSelecionada === rec.id }]"
        >
          <input
            type="radio"
            v-model="recomendacaoSelecionada"
            :value="rec.id"
          />
          <i :class="['ti', recomendacaoSelecionada === rec.id ? 'ti-circle-check' : 'ti-circle']"></i>
          <span>{{ rec.label }}</span>
        </label>
      </div>

      <!-- Aviso de privacidade -->
      <div class="aviso">
        <i class="ti ti-lock"></i>
        <p>
          Este documento é sigiloso e estará disponível apenas para a Vara da Infância.
          Nenhum dado da criança deve constar no relatório.
        </p>
      </div>

      <!-- Ações -->
      <div class="acoes-rodape">
        <button class="btn btn-ghost" @click="salvarRascunho">Salvar rascunho</button>
        <button class="btn btn-primary" @click="enviarAVara">Enviar à Vara</button>
      </div>
    </div>
  </InstituicaoLayout>
</template>

<style scoped>
.conteudo { max-width: 880px; }

.voltar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-tertiary);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}
.voltar:hover { color: var(--color-primary); }

h1 { font-size: 26px; font-weight: 600; margin-bottom: 4px; }
.subtitulo {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.resumo-visita {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  background: var(--color-bg-soft);
  padding: 14px 18px;
  border-radius: var(--radius-md);
  margin-bottom: 28px;
  font-size: 13px;
}
.resumo-label { color: var(--color-text-tertiary); }
.resumo-visita strong { font-weight: 600; }

.bloco-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin: 24px 0 12px;
}

/* critérios */
.criterios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.criterio-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 14px;
}
.criterio-nome {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}
.pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.pill {
  font-size: 11px;
  padding: 5px 11px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  background: var(--color-bg);
  transition: all 0.15s;
}
.pill:hover { border-color: var(--color-border-strong); }
.pill.pill-verde {
  background: var(--color-success-soft);
  color: var(--color-success);
  border-color: var(--color-success);
  font-weight: 600;
}
.pill.pill-amarelo {
  background: var(--color-warning-soft);
  color: var(--color-warning);
  border-color: var(--color-warning);
  font-weight: 600;
}
.pill.pill-vermelho {
  background: var(--color-danger-soft);
  color: var(--color-danger);
  border-color: var(--color-danger);
  font-weight: 600;
}

/* textarea */
.textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.6;
  font-family: inherit;
  color: var(--color-text);
  outline: none;
  resize: vertical;
  min-height: 120px;
}
.textarea:focus { border-color: var(--color-primary); }

/* recomendações */
.recomendacoes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rec-opcao {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: all 0.15s;
}
.rec-opcao:hover { border-color: var(--color-border-strong); }
.rec-opcao.selecionada {
  border-color: var(--color-success);
  background: var(--color-success-soft);
  color: var(--color-success);
  font-weight: 600;
}
.rec-opcao input { display: none; }
.rec-opcao .ti { font-size: 18px; }

/* aviso */
.aviso {
  display: flex;
  gap: 10px;
  background: var(--color-warning-soft);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  margin-top: 20px;
  align-items: flex-start;
}
.aviso .ti {
  font-size: 18px;
  color: var(--color-warning);
  flex-shrink: 0;
}
.aviso p {
  font-size: 12px;
  color: var(--color-warning);
  line-height: 1.5;
}

/* ações */
.acoes-rodape {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}
</style>
