<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelValue: string
  tag?: string
}>(), {
  tag: 'p'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const content = ref<string>(props.modelValue)
const input = ref<HTMLInputElement | null>(null)
const isEditing = ref<boolean>(false)

function onStarEditing(): void {
  isEditing.value = true
  nextTick(() => {
    input.value?.focus()
  })
}

function onStopEditing(): void {
  isEditing.value = false
}

onClickOutside(input, () => {
  isEditing.value = false
})

watch(content, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <input
      v-if="isEditing"
      ref="input"
      type="text"
      class="w-full"
      v-model="content"
      @keyup.esc="onStopEditing"
      @keyup.enter="onStopEditing" />
    <component
      v-else
      :is="tag"
      class="py-1 border-b border-transparent hover:border-stone-500"
      @click="onStarEditing">
      {{ modelValue }}
    </component>
  </div>
</template>
