<script setup lang="ts">
interface Props {
  modelValue: number
  maxLines: number
  minLines: number
  disabled?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

/**
 * Updates the value based on the new value and the active state.
 *
 * @param {number} newValue - The new value to update.
 * @param {boolean} isActive - Indicates if the value is currently active.
 * @return {number} The updated value.
 */
const numberLines = computed(() => props.modelValue)
</script>

<template>
    <textarea
      :disabled="disabled"
      v-model="modelValue">
    </textarea>
</template>