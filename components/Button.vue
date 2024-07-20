<script setup lang="ts">
const props = defineProps<{
  pending?: boolean
}>()
</script>

<template>
  <button class="grid place-content-center border border-current px-6 py-2 rounded-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis" :disabled="pending">
    <Spinner v-if="pending" />
    <slot v-else></slot>
  </button>
</template>

<style scoped>
button[disabled="true"] {
  @apply opacity-50 pointer-events-none;
}
</style>