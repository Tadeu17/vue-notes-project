<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace" href="">
          Notes app
        </div>

        <button role="button" ref="navbarBurguerRef" class="navbar-burger" :class="{ 'is-active': showMobileNav }"
          aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
          @click="showMobileNav = !showMobileNav">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" ref="navbarMenuRef" class="navbar-menu" :class="{ 'is-active': showMobileNav }">
        <div class="navbar-end">
          <RouterLink class="navbar-item" active-class="is-active" :to="{ name: 'notes' }"
            @click="showMobileNav = false">
            Notes
          </RouterLink>
          <RouterLink class="navbar-item" active-class="is-active" :to="{ name: 'stats' }"
            @click="showMobileNav = false">
            Stats
          </RouterLink>
        </div>
      </div>
    </div>

  </nav>


</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';

defineOptions({
  name: 'TheNavbar'
})

const showMobileNav = ref(false)

const navbarMenuRef = ref(null)
const navbarBurguerRef = useTemplateRef<HTMLButtonElement>('navbarBurguerRef')

onClickOutside(navbarMenuRef, () => {
  showMobileNav.value = false
}, {
  ignore: [navbarBurguerRef]
})
</script>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
