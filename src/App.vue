<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <Sidebar />
    </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}
.sidebar {
  width: 240px;
  padding: 10px;
}
main {
  margin: 20px;
}
</style>
