<script setup lang="ts">
import { useGameStore } from '@/stores/game'
const user = useSupabaseUser()

const props = defineProps<{
  data: Profile
  owner: Boolean
}>()

const emit = defineEmits<{
  expel: [id: string]
}>()

const gameStore = useGameStore()

function onExpelPlayer(): void {
  emit('expel', props.data.id)
}
</script>

<template>
  <!--     <figure class="rounded-lg aspect-square w-24">
      <img
        class="w-full h-full object-cover"
        v-if="data.imageUrl"
        :src="data.imageUrl" />
      <AvatarPlaceholder v-else />
    </figure> -->
  <div class="group w-full flex gap-4 space-between">
    <div class="flex-1 flex gap-2 items-center">
      <Icon
        name="mdi:account"
        size="24" />
      <h3
        class="text-lg leading-tight font-semibold text-stone-100 line-clamp-2 text-ellipsis">
        {{ data.name || 'Sin nombre' }}
      </h3>
    </div>
    <ContextMenu v-if="owner && data.id !== user.id">
      <MenuItem @click.stop="onExpelPlayer">Expulsar a este jugador</MenuItem>
    </ContextMenu>
  </div>
</template>
