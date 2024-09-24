<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | null): void
}>()

const positive = ref<boolean | null>(props.modelValue)

/**
 * Updates the value based on the new value and the active state.
 *
 * @param {number} newValue - The new value to update.
 * @param {boolean} isActive - Indicates if the value is currently active.
 * @return {number} The updated value.
 */
function updateValue(newValue: number): number {
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

watch(positive, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="flex gap-1 items-center">
    <button
      class="w-6 grid place-content-center md:w-8 md:rounded-md aspect-square rounded-sm border border-stone-600"
      type="button"
      role="switch"
      :data-index="index"
      :data-active="index <= modelValue"
      :disabled="disabled"
      @click="onToggle">
      <Icon
        name="mdi:minus"
        size="24" />
    </button>
    <button
      class="w-6 grid place-content-center md:w-8 md:rounded-md aspect-square rounded-sm border border-stone-600"
      type="button"
      role="switch"
      :data-index="index"
      :data-active="index <= modelValue"
      :disabled="disabled"
      @click="onToggle">
      <Icon
        name="mdi:plus"
        size="24" />
    </button>
  </div>
</template>

<style scoped>
[data-active='true'] {
  @apply bg-teal-400 border-teal-400;
}
</style>
