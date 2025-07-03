<script setup lang="ts"></script>

<template>
  <menu>
    <RouterLink to="/foo">Foo</RouterLink>
    <RouterLink to="/bar">Bar</RouterLink>
  </menu>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
