<script setup>
defineProps({
  height: { type: Number, default: 40 }
})
</script>

<template>
  <svg :height="height" viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg" aria-label="CAIS">
    <!-- C cor-de-rosa -->
    <text x="0" y="42" font-family="Inter, sans-serif" font-weight="700" font-size="44" fill="#F18AAE">c</text>
    <!-- A azul -->
    <text x="30" y="42" font-family="Inter, sans-serif" font-weight="700" font-size="44" fill="#79BCEA">a</text>
    <!-- i (corpo) verde -->
    <text x="62" y="42" font-family="Inter, sans-serif" font-weight="700" font-size="44" fill="#9DC25A">i</text>
    <!-- pingo do i: rostinho amarelo -->
    <circle cx="71.5" cy="12" r="7" fill="#F2C94C" />
    <circle cx="69" cy="11" r="1" fill="#1A1A1A" />
    <circle cx="74" cy="11" r="1" fill="#1A1A1A" />
    <path d="M 68 14 Q 71.5 17 75 14" stroke="#1A1A1A" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <!-- S laranja-rosa -->
    <text x="76" y="42" font-family="Inter, sans-serif" font-weight="700" font-size="44" fill="#F2994A">s</text>
  </svg>
</template>
