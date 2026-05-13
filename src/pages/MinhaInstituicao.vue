<script setup>
import PainelLayout from '@/components/PainelLayout.vue'

const instituicao = {
  nome: 'Lar Pequeno Príncipe',
  cidade: 'Boa Vista · Recife / PE',
  desde: '1998',
  faixa: 'Atende 0 a 12 anos',
  acolhidas: '28 crianças acolhidas',
  sobre: 'Instituição mantida pela Secretaria de Assistência Social. A rotina é organizada em torno de atividades escolares pela manhã, oficinas e brincadeiras à tarde, e refeições em conjunto. A equipe é formada por educadores sociais, psicóloga e assistente social.',
  endereco: 'R. das Flores, 240 — Boa Vista, Recife / PE',
  telefone: '(81) 3344-5566',
  email: 'contato@pequenoprincipe.org'
}

const fotos = [
  { fundo: '#FAEEDA', icone: '#854F0B' },
  { fundo: '#E1F5EE', icone: '#085041' },
  { fundo: '#EEEDFE', icone: '#3C3489' }
]

const proximaVisita = {
  data: '14 de maio',
  horario: '14h às 16h',
  descricao: '1ª visita de aproximação',
  status: 'Confirmada'
}
</script>

<template>
  <PainelLayout>
    <div class="conteudo">
      <h1>Minha instituição</h1>

      <!-- Banner de vínculo ativo -->
      <div class="banner-vinculo">
        <i class="ti ti-link"></i>
        <p>
          <strong>Vínculo ativo</strong> — você está no estágio de aproximação com esta instituição desde 28/04/2026.
        </p>
      </div>

      <!-- Cabeçalho da instituição -->
      <div class="cabecalho">
        <div class="icone-grande">
          <i class="ti ti-building"></i>
        </div>
        <div class="info">
          <h2>{{ instituicao.nome }}</h2>
          <p class="meta">{{ instituicao.cidade }} · em funcionamento desde {{ instituicao.desde }}</p>
          <div class="tags">
            <span class="tag">{{ instituicao.faixa }}</span>
            <span class="tag">{{ instituicao.acolhidas }}</span>
          </div>
        </div>
      </div>

      <!-- Galeria -->
      <div class="galeria">
        <div v-for="(foto, idx) in fotos" :key="idx" class="foto" :style="{ background: foto.fundo }">
          <i class="ti ti-photo" :style="{ color: foto.icone }"></i>
        </div>
      </div>

      <!-- Sobre -->
      <section class="bloco">
        <p class="bloco-titulo">SOBRE A INSTITUIÇÃO</p>
        <p class="sobre-texto">{{ instituicao.sobre }}</p>
      </section>

      <!-- Próxima visita -->
      <section class="bloco">
        <p class="bloco-titulo">PRÓXIMA VISITA</p>
        <div class="card-visita">
          <div class="visita-header">
            <p class="visita-data">{{ proximaVisita.data }} · {{ proximaVisita.horario }}</p>
            <span class="badge-confirmada">{{ proximaVisita.status }}</span>
          </div>
          <p class="visita-descricao">{{ proximaVisita.descricao }}</p>
        </div>
      </section>

      <!-- Contato -->
      <section class="bloco">
        <p class="bloco-titulo">CONTATO</p>
        <div class="contato">
          <div class="contato-linha">
            <i class="ti ti-map-pin"></i>
            <span>{{ instituicao.endereco }}</span>
          </div>
          <div class="contato-linha">
            <i class="ti ti-phone"></i>
            <span>{{ instituicao.telefone }}</span>
          </div>
          <div class="contato-linha">
            <i class="ti ti-mail"></i>
            <span>{{ instituicao.email }}</span>
          </div>
        </div>
      </section>

      <!-- Aviso -->
      <div class="aviso">
        <i class="ti ti-info-circle"></i>
        <p>
          O contato direto com a instituição deve ser feito apenas para questões logísticas das visitas.
          Toda comunicação formal passa pela Vara da Infância.
        </p>
      </div>
    </div>
  </PainelLayout>
</template>

<style scoped>
.conteudo { max-width: 760px; }
h1 { font-size: 28px; font-weight: 600; margin-bottom: 20px; }

/* Banner vínculo */
.banner-vinculo {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--color-success-soft);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin-bottom: 24px;
}
.banner-vinculo .ti {
  font-size: 20px;
  color: var(--color-success);
}
.banner-vinculo p {
  font-size: 13px;
  color: var(--color-success);
  line-height: 1.5;
}
.banner-vinculo strong { font-weight: 600; }

/* Cabeçalho instituição */
.cabecalho {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 24px;
}
.icone-grande {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  background: #FAEEDA;
  color: #854F0B;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
}
.info { flex: 1; }
.info h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 4px;
}
.meta {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 10px;
}
.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--color-bg-soft);
  color: var(--color-text-secondary);
}

/* Galeria */
.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}
.foto {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
}

/* blocos */
.bloco { margin-bottom: 24px; }
.bloco-titulo {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  letter-spacing: 1px;
  margin-bottom: 12px;
}
.sobre-texto {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* Card visita */
.card-visita {
  border: 1px solid var(--color-primary-border);
  background: var(--color-primary-soft);
  border-radius: var(--radius-lg);
  padding: 16px 18px;
}
.visita-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.visita-data {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
}
.badge-confirmada {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--color-bg);
  color: var(--color-primary);
  font-weight: 500;
}
.visita-descricao {
  font-size: 13px;
  color: var(--color-primary);
}

/* Contato */
.contato {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.contato-linha {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--color-border);
}
.contato-linha:last-child { border-bottom: none; }
.contato-linha .ti {
  font-size: 16px;
  color: var(--color-text-tertiary);
}

/* aviso */
.aviso {
  display: flex;
  gap: 12px;
  background: var(--color-warning-soft);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin-top: 24px;
  align-items: flex-start;
}
.aviso .ti {
  font-size: 20px;
  color: var(--color-warning);
  flex-shrink: 0;
}
.aviso p {
  font-size: 13px;
  color: var(--color-warning);
  line-height: 1.6;
}
</style>
