<script setup lang="ts">
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'

const items: MenuItem[] = [
  {
    label: 'Randomness',
    items: [
      {
        label: 'Walker',
        url: '/walker',
      },
    ],
  },
  {
    label: 'Forces',
    items: [
      { label: 'Follower', url: '/follower' },
      { label: 'Body', url: '/body' },
      { label: 'Liquid', url: '/liquid' },
    ],
  },
  {
    label: 'Oscillation',
    items: [
      { label: 'Oscillator', url: '/oscillator' },
      { label: 'Wave', url: '/wave' },
      { label: 'Spring', url: '/spring' },
      { label: 'Pendulum', url: '/pendulum' },
      { label: 'Butterfly', url: '/butterfly' },
    ],
  },
  {
    label: 'Particle System',
    items: [
      { label: 'Single Particle', url: '/single-particle' },
      { label: 'Multiple Particles', url: '/multiple-particles' },
      { label: 'Emitters', url: '/emitters' },
      { label: 'Particles Repeller', url: '/repeller' },
      { label: 'Smoke Emitter', url: '/smoke' },
    ],
  },
  {
    label: 'Autonomous Agents',
    items: [
      { label: 'Seeker', url: '/seeker' },
      { label: 'Flow Field', url: '/flow-field' },
    ],
  },
]
</script>

<template>
  <Menu :model="items" />
</template>

<style scoped></style>
