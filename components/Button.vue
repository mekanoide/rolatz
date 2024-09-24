<script setup lang="ts">
const props = defineProps<{
  pending?: boolean
  size?: 'large' | 'small'
  variant?: 'primary' | 'secondary'
}>()
</script>

<template>
  <button
    class="flex gap-2 items-center justify-center rounded-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
    :data-size="size"
    :data-variant="variant"
    :disabled="pending">
    <Spinner v-if="pending" />
    <slot v-else></slot>
  </button>
</template>

<style scoped>
button:is(:not([data-size='large']), :not([data-size='small'])) {
  @apply px-6 py-2;
}

button[data-size='small'] {
  @apply px-3 py-1 text-sm gap-1;
}

button[data-size='large'] {
  @apply px-6 py-3;
}

button:not([data-variant]) {
  @apply bg-stone-400 text-stone-950 hover:bg-stone-300;
}

button[data-variant='primary'] {
  @apply bg-amber-500 text-stone-950 hover:bg-amber-400;
}

button[disabled='true'] {
  @apply opacity-50 pointer-events-none;
}
</style>
