<script setup></script>

<template>
  <!-- Ilustração estilizada de família (mãe, pai e criança) -->
  <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg" class="ilustracao">
    <!-- Fundo verde-claro com forma de coração -->
    <path
      d="M 200 80 C 130 30 30 60 30 160 C 30 250 130 320 200 360 C 270 320 370 250 370 160 C 370 60 270 30 200 80 Z"
      fill="#E8F0D9"
    />

    <!-- Estrelinha amarela -->
    <path d="M 340 80 L 350 95 L 366 97 L 354 108 L 358 124 L 340 116 L 322 124 L 326 108 L 314 97 L 330 95 Z"
          fill="#F2C94C" />

    <!-- Bolinha rosa -->
    <path d="M 76 76 C 70 64 84 56 92 64 C 100 56 114 64 108 76 C 102 88 92 92 92 92 C 92 92 82 88 76 76 Z"
          fill="#F18AAE" />

    <!-- Pai (azul) -->
    <ellipse cx="250" cy="140" rx="34" ry="38" fill="#F5C9A3" />
    <path d="M 220 110 Q 250 90 280 110 Q 285 130 280 138 L 220 138 Q 215 130 220 110 Z" fill="#6B3E26" />
    <circle cx="240" cy="138" r="2" fill="#1A1A1A" />
    <circle cx="260" cy="138" r="2" fill="#1A1A1A" />
    <path d="M 240 152 Q 250 158 260 152" stroke="#1A1A1A" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <path d="M 190 178 Q 250 168 310 178 L 320 280 L 180 280 Z" fill="#3B7BB8" />
    <!-- Braço pai esquerdo segura criança -->
    <path d="M 195 200 Q 175 230 175 270" stroke="#3B7BB8" stroke-width="22" fill="none" stroke-linecap="round" />

    <!-- Mãe (rosa) -->
    <ellipse cx="155" cy="160" rx="32" ry="36" fill="#F5C9A3" />
    <path d="M 122 140 Q 122 110 155 110 Q 188 110 188 140 Q 195 175 188 200 Q 178 215 165 215 L 145 215 Q 132 215 122 200 Q 115 175 122 140 Z" fill="#6B3E26" />
    <!-- cabelo voltado -->
    <path d="M 122 140 Q 110 160 115 200 Q 120 195 125 175 Z" fill="#6B3E26" />
    <circle cx="147" cy="158" r="2" fill="#1A1A1A" />
    <circle cx="167" cy="158" r="2" fill="#1A1A1A" />
    <path d="M 147 172 Q 157 178 167 172" stroke="#1A1A1A" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <!-- corpo mãe -->
    <path d="M 110 195 Q 155 188 205 195 L 215 290 L 100 290 Z" fill="#E879A0" />

    <!-- Criança no meio -->
    <ellipse cx="200" cy="225" rx="22" ry="24" fill="#F5C9A3" />
    <path d="M 178 215 Q 178 195 200 195 Q 222 195 222 215 Q 222 225 218 230 L 182 230 Q 178 225 178 215 Z" fill="#3A2818" />
    <circle cx="193" cy="225" r="1.5" fill="#1A1A1A" />
    <circle cx="207" cy="225" r="1.5" fill="#1A1A1A" />
    <path d="M 193 234 Q 200 238 207 234" stroke="#1A1A1A" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <!-- corpo criança -->
    <path d="M 178 250 L 222 250 L 226 290 L 174 290 Z" fill="#7FC85A" />

    <!-- Bolinha verde decorativa -->
    <circle cx="340" cy="320" r="8" fill="#9DC25A" />
  </svg>
</template>

<style scoped>
.ilustracao {
  width: 100%;
  height: auto;
  display: block;
}
</style>
