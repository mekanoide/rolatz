<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!--     <figure class="rounded-lg aspect-square w-24">
      <img
        class="w-full h-full object-cover"
        v-if="data.imageUrl"
        :src="data.imageUrl" />
      <AvatarPlaceholder v-else />
    </figure> -->
  <div class="w-full">
    <!--       <p
        v-if="data.system"
        class="flex-1 text-sm text-stone-400">
        {{ data.system }}
      </p> -->
    <h3 class="text-lg leading-tight font-semibold line-clamp-2 text-ellipsis">
      {{ data.name || 'Sin nombre' }}
    </h3>
    <p class="line-clamp-2 text-ellipsis text-stone-400">
      {{ data.description }}
    </p>
  </div>
</template>
