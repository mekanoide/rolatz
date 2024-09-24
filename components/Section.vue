<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <section class="mt-16">
    <h2 class="text-xl font-semibold pb-2 mb-2">
      {{ title }}
    </h2>
    <div class="grid gap-4">
      <slot></slot>
    </div>
  </section>
</template>
