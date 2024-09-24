<script setup lang="ts">
interface Props {
  modelValue: number
  max: number
  min?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const level = ref<number>(props.modelValue)

/**
 * Updates the value based on the new value and the active state.
 *
 * @param {number} newValue - The new value to update.
 * @param {boolean} isActive - Indicates if the value is currently active.
 * @return {number} The updated value.
 */
function updateValue(newValue: number, isActive: boolean): number {
  const min = props.min
  const currentValue = props.modelValue
  if (newValue === currentValue && isActive) return Math.max(newValue - 1, min)
  return newValue
}

/**
 * Toggle function triggered by an event.
 *
 * @param {Event} e - The event triggering the toggle.
 * @return {void} No return value.
 */
function onToggle(e: Event): void {
  const target = e.target as HTMLButtonElement
  const isActive = target.dataset.active === 'true'
  const i = Number(target.dataset.index)
  level.value = updateValue(i, isActive)
}

watch(level, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <button
      v-for="index in max"
      class="w-6 md:w-8 h-10 md:rounded-md rounded-sm border border-stone-700"
      type="button"
      role="switch"
      :data-index="index"
      :data-active="index <= modelValue"
      :disabled="disabled"
      v-bind="$attrs"
      @click="onToggle">
    </button>
  </div>
</template>

<style scoped>
[data-active="true"] {
  @apply bg-teal-400 border-teal-400;
}
</style>