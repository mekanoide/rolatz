<script setup lang="ts">
const { logout } = useAuth()

/**
 * Asynchronously logs out the user and navigates to the authentication page.
 *
 * @return {Promise<void>} A Promise that resolves when the user is logged out and navigation is complete.
 */
async function onLogout(): Promise<void> {
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
        name="mdi:account-circle"
        size="24" />
    </button>
    <Dropdown id="menu">
      <MenuItem @click="navigateTo('/settings')"> Ajustes </MenuItem>
      <MenuItem @click="onLogout"> Desconectarse </MenuItem>
    </Dropdown>
  </div>
</template>

<style scoped>
#menu:popover-open {
  inset: unset;
  @apply flex absolute top-16 right-4;
}

#menu::backdrop {
  @apply bg-stone-950 bg-opacity-25;
}
</style>
