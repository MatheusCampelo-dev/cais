import { createRouter, createWebHistory } from 'vue-router'

import Inicio from '@/pages/Inicio.vue'
import PorOndeComecar from '@/pages/PorOndeComecar.vue'
import LocalizarVara from '@/pages/LocalizarVara.vue'
import Instituicoes from '@/pages/Instituicoes.vue'
import DetalheInstituicao from '@/pages/DetalheInstituicao.vue'
import CadastroLogin from '@/pages/Cadastro/CadastroLogin.vue'
import Painel from '@/pages/Painel.vue'
import Documentos from '@/pages/Documentos.vue'

const routes = [
  // Área pública
  { path: '/', name: 'inicio', component: Inicio },
  { path: '/por-onde-comecar', name: 'por-onde-comecar', component: PorOndeComecar },
  { path: '/localizar-vara', name: 'localizar-vara', component: LocalizarVara },
  { path: '/instituicoes', name: 'instituicoes', component: Instituicoes },
  { path: '/instituicoes/:id', name: 'detalhe-instituicao', component: DetalheInstituicao },
  { path: '/cadastro', name: 'cadastro', component: CadastroLogin },

  // Painel do adotante
  { path: '/painel', name: 'painel', component: Painel },
  { path: '/painel/documentos', name: 'documentos', component: Documentos },

  // Catch-all
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
