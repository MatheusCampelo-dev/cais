<script setup>
import { ref } from 'vue'
import GovernoLayout from '@/components/GovernoLayout.vue'

const busca = ref('')

const varas = ref([
  { id: 1, nome: 'Vara da Infância — Recife', comarca: 'Recife', endereco: 'Av. Desembargador Guerra Barreto, 200', telefone: '(81) 3181-1700', juiz: 'Dra. Helena Castro', servidores: 12, processosAtivos: 312, ativa: true },
  { id: 2, nome: 'Vara da Infância — Olinda', comarca: 'Olinda', endereco: 'Av. Joaquim Nabuco, 400', telefone: '(81) 3439-2200', juiz: 'Dr. Marcos Pereira', servidores: 8, processosAtivos: 187, ativa: true },
  { id: 3, nome: 'Vara da Infância — Jaboatão', comarca: 'Jaboatão dos Guararapes', endereco: 'R. José Belmiro de Almeida, 90', telefone: '(81) 3361-8800', juiz: 'Dra. Patrícia Lopes', servidores: 10, processosAtivos: 204, ativa: true },
  { id: 4, nome: 'Vara da Infância — Paulista', comarca: 'Paulista', endereco: 'Av. Pres. Castelo Branco, 1500', telefone: '(81) 3437-1100', juiz: 'Dr. Antônio Vieira', servidores: 6, processosAtivos: 98, ativa: true },
  { id: 5, nome: 'Vara da Infância — Caruaru', comarca: 'Caruaru', endereco: 'R. 15 de Novembro, 320', telefone: '(81) 3722-4400', juiz: 'Dra. Renata Alves', servidores: 7, processosAtivos: 142, ativa: false }
])

const modalAberto = ref(false)
const editando = ref(null)

const novoFormulario = () => ({
  nome: '', comarca: '', endereco: '', telefone: '', juiz: '', servidores: 0, processosAtivos: 0, ativa: true
})
const form = ref(novoFormulario())

const abrirNova = () => {
  editando.value = null
  form.value = novoFormulario()
  modalAberto.value = true
}

const editar = (vara) => {
  editando.value = vara.id
  form.value = { ...vara }
  modalAberto.value = true
}

const salvar = () => {
  if (editando.value) {
    const idx = varas.value.findIndex(v => v.id === editando.value)
    if (idx >= 0) varas.value[idx] = { ...form.value, id: editando.value }
  } else {
    const novoId = Math.max(...varas.value.map(v => v.id)) + 1
    varas.value.push({ ...form.value, id: novoId })
  }
  modalAberto.value = false
}

const alternarAtiva = (vara) => {
  vara.ativa = !vara.ativa
}
</script>

<template>
  <GovernoLayout>
    <div class="conteudo">
      <div class="cabecalho">
        <div>
          <h1>Varas da comarca</h1>
          <p class="subtitulo">{{ varas.length }} varas cadastradas · {{ varas.filter(v => v.ativa).length }} ativas</p>
        </div>
        <button class="btn btn-primary" @click="abrirNova">
          <i class="ti ti-plus"></i>
          Nova vara
        </button>
      </div>

      <!-- Busca -->
      <div class="busca">
        <i class="ti ti-search"></i>
        <input v-model="busca" placeholder="Buscar por nome ou comarca..." />
      </div>

      <!-- Tabela -->
      <div class="tabela">
        <div class="thead">
          <div>Vara</div>
          <div>Juiz titular</div>
          <div>Servidores</div>
          <div>Processos</div>
          <div>Status</div>
          <div></div>
        </div>
        <div v-for="vara in varas.filter(v => !busca || v.nome.toLowerCase().includes(busca.toLowerCase()) || v.comarca.toLowerCase().includes(busca.toLowerCase()))" :key="vara.id" class="trow">
          <div class="td-nome">
            <p class="nome">{{ vara.nome }}</p>
            <p class="ref"><i class="ti ti-map-pin"></i> {{ vara.endereco }}</p>
          </div>
          <div class="td-meta">{{ vara.juiz }}</div>
          <div class="td-meta">{{ vara.servidores }}</div>
          <div class="td-meta">{{ vara.processosAtivos }}</div>
          <div>
            <button :class="['toggle', { ativo: vara.ativa }]" @click="alternarAtiva(vara)">
              <span class="bola"></span>
            </button>
          </div>
          <div class="td-acoes">
            <button class="btn-acao" @click="editar(vara)" title="Editar">
              <i class="ti ti-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de edição/criação -->
    <div v-if="modalAberto" class="modal-overlay" @click.self="modalAberto = false">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editando ? 'Editar vara' : 'Nova vara' }}</h2>
          <button class="modal-close" @click="modalAberto = false"><i class="ti ti-x"></i></button>
        </div>

        <div class="modal-body">
          <div class="campo">
            <label>Nome da vara</label>
            <input v-model="form.nome" placeholder="Ex: Vara da Infância — Recife" />
          </div>
          <div class="form-grid">
            <div class="campo">
              <label>Comarca</label>
              <input v-model="form.comarca" placeholder="Ex: Recife" />
            </div>
            <div class="campo">
              <label>Telefone</label>
              <input v-model="form.telefone" placeholder="(81) 0000-0000" />
            </div>
          </div>
          <div class="campo">
            <label>Endereço</label>
            <input v-model="form.endereco" placeholder="Rua, número, bairro" />
          </div>
          <div class="campo">
            <label>Juiz titular</label>
            <input v-model="form.juiz" placeholder="Nome completo" />
          </div>
          <div class="form-grid">
            <div class="campo">
              <label>Servidores</label>
              <input v-model.number="form.servidores" type="number" min="0" />
            </div>
            <div class="campo">
              <label>Processos ativos</label>
              <input v-model.number="form.processosAtivos" type="number" min="0" />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-ghost" @click="modalAberto = false">Cancelar</button>
          <button class="btn btn-primary" @click="salvar">
            {{ editando ? 'Salvar alterações' : 'Cadastrar vara' }}
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
.subtitulo { font-size: 14px; color: var(--color-text-secondary); }

.busca {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 20px;
}
.busca .ti { font-size: 16px; color: var(--color-text-tertiary); }
.busca input { flex: 1; border: none; outline: none; background: transparent; font-size: 14px; }

/* tabela */
.tabela {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg);
}
.thead {
  display: grid;
  grid-template-columns: 2.2fr 1.4fr 100px 100px 80px 60px;
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
  grid-template-columns: 2.2fr 1.4fr 100px 100px 80px 60px;
  gap: 14px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  font-size: 14px;
}
.trow:last-child { border-bottom: none; }

.td-nome .nome { font-weight: 600; font-size: 14px; }
.td-nome .ref {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.td-meta { color: var(--color-text-secondary); }
.td-acoes { display: flex; gap: 4px; justify-content: flex-end; }
.btn-acao {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-acao:hover { background: var(--color-bg-soft); color: var(--color-primary); }
.btn-acao .ti { font-size: 16px; }

/* toggle */
.toggle {
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: var(--color-border-strong);
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}
.toggle.ativo { background: var(--color-success); }
.bola {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s;
}
.toggle.ativo .bola { transform: translateX(16px); }

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
  max-width: 560px;
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
.modal-body {
  padding: 20px 22px;
  overflow-y: auto;
}
.modal-footer {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 14px 22px;
  border-top: 1px solid var(--color-border);
}
.campo { margin-bottom: 14px; }
.campo label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}
.campo input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  outline: none;
}
.campo input:focus { border-color: var(--color-primary); }
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>
