<template>
  <TheNavbar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from '@/components/layout/TheNavbar.vue'
import { useStoreAuth } from './stores/storeAuth';
import { onMounted } from 'vue';

const storeAuth = useStoreAuth()

onMounted(() => {
  storeAuth.init()
})
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
