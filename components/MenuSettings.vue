<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { ref } from 'vue'

const { logout } = useAuth()

const isMenuOpen = ref(false)

function onToggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

async function onLogout() {
  await logout()
  navigateTo('/auth')
}
</script>

<template>
  <div class="relative">
    <button
      class="flex p-4"
      type="button"
      popovertarget="menu">
      <Icon
        name="mdi:menu"
        size="24" />
    </button>
    <div
      role="menu"
      popover
      id="menu">
      <button
        type="button"
        @click="onLogout">
        Desconectarse
      </button>
    </div>
  </div>
</template>

<style scoped>
[popover] {
  position: absolute;
  inset: unset;
  right: 0;
  top: 100%;
}
</style>
