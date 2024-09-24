<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

const isCopied = ref<boolean>(false)

function onCopyLink() {
  isCopied.value = true
  navigator.clipboard.writeText(props.text)
  setTimeout(() => {
    isCopied.value = false
  }, 3000)
}
</script>

<template>
  <div
    class="border border-stone-700 rounded-md"
    role="button"
    @click="onCopyLink">
    <div
      v-if="!isCopied"
      class="flex items-center gap-4 py-2 px-4">
      <span class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
        {{ text }}
      </span>
      <Icon
        name="mdi:content-copy"
        size="16" />
    </div>
    <div
      v-else
      class="w-full flex justify-center items-center gap-4 py-2 px-4 rounded-md bg-teal-600">
      Copiado
      <Icon
        name="mdi:check"
        size="16" />
    </div>
  </div>
</template>
