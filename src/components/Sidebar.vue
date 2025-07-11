<script setup lang="ts">
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'

const items: MenuItem[] = [
  { label: 'Walker', url: '/walker' },
  { label: 'Body', url: '/body' },
  { label: 'Liquid', url: '/liquid' },
  { label: 'Oscillator', url: '/oscillator' },
  { label: 'Wave', url: '/wave' },
  { label: 'Spring', url: '/spring' },
  { label: 'Pendulum', url: '/pendulum' },
  { label: 'Butterfly', url: '/butterfly' },
]
</script>

<template>
  <Menu :model="items" />
</template>

<style scoped></style>
