<script setup>
import { ref, computed } from 'vue'
import InstituicaoLayout from '@/components/InstituicaoLayout.vue'

const form = ref({
  nome: 'Lar Pequeno Príncipe',
  sobre: 'Instituição mantida pela Secretaria de Assistência Social, em funcionamento desde 1998. A rotina é organizada em torno de atividades escolares pela manhã, oficinas e brincadeiras à tarde, e refeições em conjunto. A equipe é formada por educadores sociais, psicóloga e assistente social.',
  telefone: '(81) 3344-5566',
  email: 'contato@pequenoprincipe.org',
  endereco: 'R. das Flores, 240 — Boa Vista, Recife / PE'
})

const fotos = ref([
  { id: 1, fundo: '#FAEEDA', icone: '#854F0B' },
  { id: 2, fundo: '#E1F5EE', icone: '#085041' },
  { id: 3, fundo: '#EEEDFE', icone: '#3C3489' }
])

const limiteCaracteres = 600
const caracteresUsados = computed(() => form.value.sobre.length)

const removerFoto = (id) => {
  fotos.value = fotos.value.filter(f => f.id !== id)
}

const adicionarFoto = () => {
  alert('Selecionar arquivo do dispositivo (integração de upload).')
}

const cancelar = () => {
  alert('Alterações descartadas.')
}

const salvar = () => {
  alert('Perfil atualizado.')
}
</script>

<template>
  <InstituicaoLayout>
    <div class="conteudo">
      <h1>Perfil da instituição</h1>
      <p class="subtitulo">Informações exibidas na consulta pública e no painel do adotante após o vínculo.</p>

      <div class="campo">
        <label>NOME DA INSTITUIÇÃO</label>
        <input v-model="form.nome" type="text" />
      </div>

      <div class="campo">
        <label>SOBRE A INSTITUIÇÃO</label>
        <textarea
          v-model="form.sobre"
          :maxlength="limiteCaracteres"
          rows="5"
        ></textarea>
        <p class="contador">{{ caracteresUsados }} / {{ limiteCaracteres }} caracteres</p>
      </div>

      <div class="campo">
        <label>FOTOS DOS ESPAÇOS COMUNS</label>
        <div class="fotos-grid">
          <div
            v-for="foto in fotos"
            :key="foto.id"
            class="foto"
            :style="{ background: foto.fundo }"
          >
            <i class="ti ti-photo" :style="{ color: foto.icone }"></i>
            <button class="foto-remover" @click="removerFoto(foto.id)" type="button">
              <i class="ti ti-x"></i>
            </button>
          </div>
          <button class="foto-adicionar" @click="adicionarFoto" type="button">
            <i class="ti ti-plus"></i>
            <span>Adicionar</span>
          </button>
        </div>
        <div class="aviso-fotos">
          <i class="ti ti-alert-triangle"></i>
          <p>Não envie fotos com crianças identificáveis. Use apenas imagens de espaços comuns vazios.</p>
        </div>
      </div>

      <p class="bloco-titulo">CONTATO PÚBLICO</p>
      <div class="contato-grid">
        <div class="campo">
          <label class="label-pequeno">Telefone</label>
          <input v-model="form.telefone" type="text" />
        </div>
        <div class="campo">
          <label class="label-pequeno">E-mail</label>
          <input v-model="form.email" type="email" />
        </div>
      </div>

      <div class="campo">
        <label class="label-pequeno">Endereço</label>
        <input v-model="form.endereco" type="text" />
      </div>

      <div class="acoes-rodape">
        <button class="btn btn-ghost" @click="cancelar">Cancelar</button>
        <button class="btn btn-primary" @click="salvar">Salvar alterações</button>
      </div>
    </div>
  </InstituicaoLayout>
</template>

<style scoped>
.conteudo { max-width: 760px; }

h1 { font-size: 26px; font-weight: 600; margin-bottom: 4px; }
.subtitulo {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.campo {
  margin-bottom: 20px;
}
.campo label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.label-pequeno {
  font-size: 11px !important;
  font-weight: 500 !important;
  color: var(--color-text-tertiary) !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
}
.campo input,
.campo textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  color: var(--color-text);
  transition: border 0.15s;
}
.campo textarea {
  line-height: 1.6;
  resize: vertical;
  min-height: 100px;
}
.campo input:focus,
.campo textarea:focus {
  border-color: var(--color-primary);
}
.contador {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: 6px;
  text-align: right;
}

/* fotos */
.fotos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.foto {
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: relative;
}
.foto-remover {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-bg);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}
.foto-remover:hover { color: var(--color-danger); }
.foto-adicionar {
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-md);
  border: 1.5px dashed var(--color-border-strong);
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--color-text-tertiary);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.15s;
}
.foto-adicionar:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.foto-adicionar .ti { font-size: 20px; }

.aviso-fotos {
  display: flex;
  gap: 10px;
  background: var(--color-warning-soft);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  margin-top: 12px;
  align-items: center;
}
.aviso-fotos .ti {
  font-size: 16px;
  color: var(--color-warning);
}
.aviso-fotos p {
  font-size: 11px;
  color: var(--color-warning);
  line-height: 1.5;
}

.bloco-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin: 24px 0 12px;
}

.contato-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.acoes-rodape {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}
</style>
