<script setup lang="ts">
const props = defineProps<{
  selected: boolean
}>()

const emit = defineEmits(['select'])
</script>

<template>
  <button
    class="p-4 font-semibold"
    role="tab"
    :aria-selected="selected"
    @click="emit('select')">
    <slot></slot>
  </button>
</template>

<style scoped>
[aria-selected='true'] {
  @apply text-amber-500;
  box-shadow: inset 0 -2px 0 0 currentColor;
}
</style>
