<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="sidebar">
    <Sidebar />
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.sidebar {
  width: 200px;
}
</style>
