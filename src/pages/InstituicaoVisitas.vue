<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InstituicaoLayout from '@/components/InstituicaoLayout.vue'

const router = useRouter()

const visitas = ref([
  { id: 1, data: '14/05/2026', diaSemana: 'Quinta', horario: '14h às 16h', adotante: 'Maria Silva', processo: '2026-001847', tipo: '1ª visita de aproximação', status: 'agendada', podeRegistrarRelatorio: false },
  { id: 2, data: '17/05/2026', diaSemana: 'Domingo', horario: '10h às 12h', adotante: 'João e Ana Lima', processo: '2026-001902', tipo: '3ª visita de aproximação', status: 'agendada', podeRegistrarRelatorio: false },
  { id: 3, data: '08/05/2026', diaSemana: 'Quinta', horario: '14h às 16h', adotante: 'Carla Souza', processo: '2025-003012', tipo: 'Acompanhamento de convivência', status: 'realizada', podeRegistrarRelatorio: true },
  { id: 4, data: '05/05/2026', diaSemana: 'Segunda', horario: '15h às 17h', adotante: 'Maria Silva', processo: '2026-001847', tipo: 'Visita preliminar', status: 'realizada', podeRegistrarRelatorio: false }
])

const adotantesElegiveis = [
  { processo: '2026-001847', nome: 'Maria Silva' },
  { processo: '2026-001902', nome: 'João e Ana Lima' },
  { processo: '2025-003012', nome: 'Carla Souza' },
  { processo: '2026-002104', nome: 'Roberto e Helena Cunha' }
]

const proximas = ref([])
const realizadas = ref([])

const atualizarListas = () => {
  proximas.value = visitas.value.filter(v => v.status === 'agendada')
  realizadas.value = visitas.value.filter(v => v.status === 'realizada')
}
atualizarListas()

// Modal Nova visita
const modalNova = ref(false)
const formNova = ref({ processo: '', tipo: '', data: '', horaInicio: '', horaFim: '' })

const abrirNovaVisita = () => {
  formNova.value = { processo: '', tipo: '1ª visita de aproximação', data: '', horaInicio: '', horaFim: '' }
  modalNova.value = true
}

const salvarNova = () => {
  if (!formNova.value.processo || !formNova.value.data || !formNova.value.horaInicio) {
    alert('Preencha processo, data e horário.')
    return
  }
  const adotante = adotantesElegiveis.find(a => a.processo === formNova.value.processo)
  const dataFormatada = formNova.value.data.split('-').reverse().join('/')
  const novoId = Math.max(...visitas.value.map(v => v.id)) + 1
  visitas.value.push({
    id: novoId,
    data: dataFormatada,
    diaSemana: obterDiaSemana(formNova.value.data),
    horario: `${formNova.value.horaInicio} às ${formNova.value.horaFim || '—'}`,
    adotante: adotante?.nome || '',
    processo: formNova.value.processo,
    tipo: formNova.value.tipo,
    status: 'agendada',
    podeRegistrarRelatorio: false
  })
  atualizarListas()
  modalNova.value = false
  mostrarToast('Visita agendada')
}

const obterDiaSemana = (iso) => {
  if (!iso) return ''
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  return dias[new Date(iso + 'T00:00:00').getDay()]
}

// Modal Reagendar
const modalReagendar = ref(false)
const visitaReagendando = ref(null)
const formReagendar = ref({ data: '', horaInicio: '', horaFim: '', motivo: '' })

const abrirReagendar = (visita) => {
  visitaReagendando.value = visita
  formReagendar.value = { data: '', horaInicio: '', horaFim: '', motivo: '' }
  modalReagendar.value = true
}

const confirmarReagendamento = () => {
  if (!formReagendar.value.data || !formReagendar.value.horaInicio) {
    alert('Informe a nova data e horário.')
    return
  }
  const idx = visitas.value.findIndex(v => v.id === visitaReagendando.value.id)
  if (idx >= 0) {
    visitas.value[idx].data = formReagendar.value.data.split('-').reverse().join('/')
    visitas.value[idx].diaSemana = obterDiaSemana(formReagendar.value.data)
    visitas.value[idx].horario = `${formReagendar.value.horaInicio} às ${formReagendar.value.horaFim || '—'}`
  }
  atualizarListas()
  modalReagendar.value = false
  mostrarToast('Visita reagendada')
}

// Toast
const toast = ref(null)
const mostrarToast = (msg) => {
  toast.value = msg
  setTimeout(() => { toast.value = null }, 3000)
}

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
        <button class="btn btn-primary" @click="abrirNovaVisita">
          <i class="ti ti-calendar-plus"></i>
          Nova visita
        </button>
      </div>

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
            <button class="btn btn-ghost btn-pequeno" @click="abrirReagendar(v)">
              <i class="ti ti-edit"></i>
              Reagendar
            </button>
          </div>
        </div>
      </div>

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
            <button v-if="v.podeRegistrarRelatorio" class="btn btn-primary btn-pequeno" @click="irParaRelatorio(v)">
              <i class="ti ti-edit"></i> Registrar relatório
            </button>
            <button v-else class="btn btn-ghost btn-pequeno">
              <i class="ti ti-eye"></i> Ver relatório
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nova Visita -->
    <div v-if="modalNova" class="modal-overlay" @click.self="modalNova = false">
      <div class="modal">
        <div class="modal-header">
          <h2>Nova visita</h2>
          <button class="modal-close" @click="modalNova = false"><i class="ti ti-x"></i></button>
        </div>
        <div class="modal-body">
          <div class="campo">
            <label>Adotante (processo)</label>
            <select v-model="formNova.processo">
              <option value="">Selecione...</option>
              <option v-for="a in adotantesElegiveis" :key="a.processo" :value="a.processo">
                {{ a.nome }} — {{ a.processo }}
              </option>
            </select>
          </div>
          <div class="campo">
            <label>Tipo de visita</label>
            <select v-model="formNova.tipo">
              <option>1ª visita de aproximação</option>
              <option>2ª visita de aproximação</option>
              <option>3ª visita de aproximação</option>
              <option>Acompanhamento de convivência</option>
              <option>Visita preliminar</option>
            </select>
          </div>
          <div class="campo">
            <label>Data</label>
            <input type="date" v-model="formNova.data" />
          </div>
          <div class="form-grid">
            <div class="campo">
              <label>Hora início</label>
              <input type="time" v-model="formNova.horaInicio" />
            </div>
            <div class="campo">
              <label>Hora término</label>
              <input type="time" v-model="formNova.horaFim" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" @click="modalNova = false">Cancelar</button>
          <button class="btn btn-primary" @click="salvarNova">Agendar visita</button>
        </div>
      </div>
    </div>

    <!-- Modal Reagendar -->
    <div v-if="modalReagendar" class="modal-overlay" @click.self="modalReagendar = false">
      <div class="modal">
        <div class="modal-header">
          <h2>Reagendar visita</h2>
          <button class="modal-close" @click="modalReagendar = false"><i class="ti ti-x"></i></button>
        </div>
        <div class="modal-body">
          <div class="resumo-original">
            <p class="resumo-label">Data original</p>
            <p class="resumo-valor">
              {{ visitaReagendando?.data }} · {{ visitaReagendando?.horario }}
            </p>
            <p class="resumo-meta">{{ visitaReagendando?.adotante }} · {{ visitaReagendando?.tipo }}</p>
          </div>

          <div class="campo">
            <label>Nova data</label>
            <input type="date" v-model="formReagendar.data" />
          </div>
          <div class="form-grid">
            <div class="campo">
              <label>Hora início</label>
              <input type="time" v-model="formReagendar.horaInicio" />
            </div>
            <div class="campo">
              <label>Hora término</label>
              <input type="time" v-model="formReagendar.horaFim" />
            </div>
          </div>
          <div class="campo">
            <label>Motivo do reagendamento</label>
            <textarea v-model="formReagendar.motivo" rows="3" placeholder="Será registrado no histórico"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" @click="modalReagendar = false">Cancelar</button>
          <button class="btn btn-primary" @click="confirmarReagendamento">Confirmar reagendamento</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast" class="toast">
        <i class="ti ti-circle-check"></i>
        <span>{{ toast }}</span>
      </div>
    </transition>
  </InstituicaoLayout>
</template>

<style scoped>
.conteudo { max-width: 1000px; position: relative; }

.cabecalho {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
h1 { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
.subtitulo { font-size: 14px; color: var(--color-text-secondary); }

.bloco-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin: 28px 0 12px;
}
.bloco-titulo:first-of-type { margin-top: 0; }

.lista { display: flex; flex-direction: column; gap: 12px; }

.visita-card {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 18px 20px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}
.visita-card:hover { border-color: var(--color-border-strong); }
.visita-card.realizada { background: var(--color-bg-soft); }

.data-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  padding: 4px 0;
  border-right: 1px solid var(--color-border);
  flex-shrink: 0;
}
.data-box .dia { font-size: 26px; font-weight: 600; color: var(--color-primary); line-height: 1; }
.visita-card.realizada .data-box .dia { color: var(--color-text-tertiary); }
.data-box .mes { font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary); margin-top: 4px; font-weight: 500; letter-spacing: 0.5px; }
.data-box .dia-semana { font-size: 10px; color: var(--color-text-tertiary); margin-top: 4px; }

.info { flex: 1; }
.info-header { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.info h3 { flex: 1; font-size: 15px; font-weight: 600; }
.badge { font-size: 11px; padding: 3px 10px; border-radius: 12px; font-weight: 500; }
.badge.agendada { background: var(--color-primary-soft); color: var(--color-primary); }
.badge.pendente { background: var(--color-warning-soft); color: var(--color-warning); }
.badge.concluida { background: var(--color-success-soft); color: var(--color-success); }

.tipo-visita { font-size: 13px; color: var(--color-text-secondary); margin-bottom: 6px; }
.meta { display: flex; gap: 16px; font-size: 12px; color: var(--color-text-tertiary); }
.meta .ti { font-size: 13px; margin-right: 4px; vertical-align: -1px; }

.acoes-card { flex-shrink: 0; }
.btn-pequeno { font-size: 12px; padding: 7px 13px; }

/* modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
}
.modal {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-bottom: 1px solid var(--color-border);
}
.modal-header h2 { font-size: 17px; font-weight: 600; }
.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
}
.modal-close:hover { background: var(--color-bg-soft); }
.modal-body { padding: 20px 22px; overflow-y: auto; }
.modal-footer {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 14px 22px;
  border-top: 1px solid var(--color-border);
}

.resumo-original {
  background: var(--color-bg-soft);
  padding: 12px 14px;
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}
.resumo-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.resumo-valor { font-size: 14px; font-weight: 600; margin-top: 2px; }
.resumo-meta { font-size: 12px; color: var(--color-text-secondary); margin-top: 2px; }

.campo { margin-bottom: 14px; }
.campo label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}
.campo input,
.campo select,
.campo textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  outline: none;
  font-family: inherit;
  background: var(--color-bg);
}
.campo textarea { resize: vertical; min-height: 70px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* toast */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--color-success);
  color: white;
  padding: 12px 18px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  z-index: 200;
}
.toast .ti { font-size: 20px; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }
</style>
