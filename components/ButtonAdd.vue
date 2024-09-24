<script setup lang="ts">
const props = defineProps({
  pending: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Añadir'
  }
})
</script>

<template>
  <button
    class="flex text-sm place-content-center py-1 w-min text-stone-500 hover:text-stone-400"
    :disabled="pending">
    <Spinner v-if="pending" />
    <div
      v-else
      class="flex gap-2 items-center">
      <Icon
        name="mdi:plus-circle-outline"
        size="20" />
      <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ label }}</span>
    </div>
  </button>
</template>

<style scoped>
button[disabled='true'] {
  @apply opacity-50 pointer-events-none;
}
</style>
