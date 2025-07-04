<script setup lang="ts">
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'

const items: MenuItem[] = [
  { label: 'Foo', url: '/foo' },
  { label: 'Bar', url: '/bar' },
]
</script>

<template>
  <Menu :model="items" />
</template>

<style scoped></style>
