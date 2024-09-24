<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  fixed?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'delete'): void
}>()

const content = ref(props.modelValue)


function onDelete() {
  // TODO: implementar la confirmación
  emit('delete')
}

watch(content, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <input
      type="text"
      class="flex-1"
      :placeholder="placeholder"
      v-model="content"
      @blur="emit('blur')" />
    <slot></slot>
    <button
      :disabled="fixed"
      type="button"
      @click="onDelete"
      class="flex py-2 px-1 disabled:opacity-50">
      <Icon
        class="text-stone-700 hover:text-stone-400"
        name="mdi:close"
        size="24" />
    </button>
  </div>
</template>
