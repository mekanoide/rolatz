<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
const dialogStore = useDialogStore()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <ConfirmationDialog
      v-if="dialogStore.isOpen"
      :title="dialogStore.title"
      :message="dialogStore.message"
      :confirmText="dialogStore.confirmText"
      :cancelText="dialogStore.cancelText" />
  </NuxtLayout>
</template>
