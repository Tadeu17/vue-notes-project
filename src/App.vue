<template>
  <TheNavbar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from '@/components/layout/TheNavbar.vue'
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
