<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  description: string
  placeholder?: string
 }>()
const emit = defineEmits(['update:description'])

const description = ref(props.description)
</script>

<template>
  <div class="flex gap-2">
    <input
      type="text"
      class="flex-1"
      :placeholder="placeholder"
      v-model="description" />
    <slot></slot>
  </div>
</template>
