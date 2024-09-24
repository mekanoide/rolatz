<script setup lang="ts">
const props = defineProps<{
  data: Character
  hasMenu?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleMenu', id: string): void
}>()

const isShowingMenu = ref<boolean>(false)
</script>

<template>
  <div class="grid grid-cols-[auto_1fr_auto]">
    <div class="aspect-square w-24 overflow-hidden rounded-lg bg-stone-950 border border-stone-800">
      <NuxtPicture
        class="object-cover"
        v-if="props.data.imageUrl"
        format="jpg"
        :src="useImageUrl(props.data.imageUrl)" />
      <AvatarPlaceholder class="w-full aspect-square" v-else />
    </div>
    <div class="w-full px-4 py-2">
      <!--       <p class="flex-1 text-sm text-stone-400">
          {{ data.game }} {{ data.system }}
        </p> -->
      <h3 class="text-lg leading-tight font-semibold line-clamp-2 text-ellipsis">
        {{ props.data.name || 'Sin nombre' }}
      </h3>
      <p class="line-clamp-2 text-ellipsis text-stone-400">
        {{ props.data.description }}
      </p>
    </div>
    <ContextMenu v-if="hasMenu">
      <slot name="menu"></slot>
    </ContextMenu>
  </div>
</template>
