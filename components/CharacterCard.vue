<script setup lang="ts">
const props = defineProps<{
  data: Character
}>()

function onClick() {
  navigateTo(`/character/${props.data.id}`)
}
</script>

<template>
  <Card
    class="grid-cols-[auto_1fr] p-4 hover:border-stone-700"
    role="button"
    @click="onClick">
    <figure class="rounded-lg aspect-square w-24">
      <img
        class="w-full h-full object-cover"
        v-if="data.imageUrl"
        :src="data.imageUrl" />
      <AvatarPlaceholder v-else />
    </figure>
    <div class="w-full">
      <div class="flex gap-2 items-center text-stone-500">
        <p
          v-if="data.game"
          class="flex-1 text-sm">
          {{ data.game }}
        </p>
        <button type="button"><Icon name="mdi:dots-horizontal" size="24" /></button>
      </div>
      <h2 class="line-clamp-2 text-ellipsis">{{ data.name }}</h2>
      <p class="line-clamp-2 text-ellipsis">{{ data.description }}</p>
    </div>
  </Card>
</template>
