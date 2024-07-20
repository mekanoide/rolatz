<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { useRoute } from 'nuxt/app'
const characterStore = useCharacterStore()
const route = useRoute()

const character = characterStore.fetchCharacter(route.params.id)
</script>

<template>
  <Header>
    <NuxtLink
      to="/"
      class="flex p-4">
      <Icon
        name="mdi:arrow-left"
        size="24" />
    </NuxtLink>
  </Header>
  <main>
    <figure
      class="aspect-square mx-auto overflow-hidden md:max-w-sm md:rounded-full md:mt-16">
      <img
        v-if="character.imageUrl"
        class="w-full h-full object-cover"
        :src="character.imageUrl" />
      <AvatarPlaceholder v-else />
    </figure>
    <article class="px-4 pb-4">
      <div
        class="max-w-screen-md mx-auto px-4 py-2 -mt-16 flex gap-4 justify-center relative z-10">
        <div class="text-center">
          <h1>{{ character.name }}</h1>
          <p>{{ character.description }}</p>
        </div>
      </div>
      <CharacterConcordia :data="character" />
    </article>
  </main>
</template>

<style scoped>
figure {
  mask: linear-gradient(
    to bottom,
    white calc(100% - 8rem),
    hsl(0 0% 0% / 0%) 100%
  );
}
</style>
