<script setup>
import { RouterLink, useRoute } from 'vue-router'
import LogoCais from '@/assets/logo/LogoCais.vue'

const route = useRoute()

const links = [
  { to: '/governo', label: 'Painel', icon: 'ti-layout-dashboard', name: 'governo-painel' },
  { to: '/governo/adotantes', label: 'Adotantes', icon: 'ti-users', name: 'governo-adotantes' },
  { to: '/governo/instituicoes', label: 'Instituições', icon: 'ti-building', name: 'governo-instituicoes' },
]

const isActive = (name) => route.name === name
</script>

<template>
  <aside class="sidebar">
    <RouterLink to="/" class="brand">
      <LogoCais :height="36" />
      <div class="brand-tag">
        <span>Centro de apoio à</span>
        <span>infância e a socialização</span>
      </div>
    </RouterLink>

    <div class="brand-section">
      <i class="ti ti-shield-check brand-icon"></i>
      <div>
        <p class="brand-label">Painel do Governo</p>
        <p class="brand-sub">Vara da Infância — Recife</p>
      </div>
    </div>

    <nav class="nav">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="['nav-item', { active: isActive(link.name) }]"
      >
        <i :class="['ti', link.icon]"></i>
        <span>{{ link.label }}</span>
      </RouterLink>
    </nav>

    <div class="user-card">
      <div class="avatar">CS</div>
      <div class="user-info">
        <p class="user-name">Carlos Souza</p>
        <p class="user-role">Servidor da Vara</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  flex-shrink: 0;
  background: var(--color-bg-soft);
  border-right: 1px solid var(--color-border);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 16px;
  border-bottom: 1px solid var(--color-border);
}
.brand-tag {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  color: var(--color-primary);
  line-height: 1.3;
}
.brand-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px 14px;
}
.brand-icon {
  font-size: 22px;
  color: var(--color-primary);
}
.brand-label {
  font-weight: 600;
  font-size: 13px;
}
.brand-sub {
  font-size: 11px;
  color: var(--color-text-tertiary);
}
.nav {
  display: flex;
  flex-direction: column;
  padding: 4px 12px;
  flex: 1;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: all 0.15s;
}
.nav-item:hover { background: rgba(0,0,0,0.04); }
.nav-item.active {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
.nav-item .ti { font-size: 18px; }

.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  margin-top: 16px;
  border-top: 1px solid var(--color-border);
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
}
.user-name { font-size: 13px; font-weight: 600; }
.user-role { font-size: 11px; color: var(--color-text-tertiary); }
</style>
