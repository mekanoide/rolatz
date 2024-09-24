<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { useCharacterStore } from '@/stores/character'
import { watchDebounced } from '@vueuse/core'

const characterStore = useCharacterStore()
const route = useRoute()
const character = ref()
const pending = ref<boolean>(false)

const config = useRuntimeConfig()

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
character.value = await characterStore.fetchCharacter(id)
console.log('character', character.value)

async function updateCharacter(data: any) {
  pending.value = true
  await characterStore.updateCharacter(data)
  pending.value = false
}

async function onUploadImage(path: string) {
  character.value.imageUrl = path
}

const systemName = computed(() => {
  switch (character.value.system) {
    case 'concordia':
      return 'SheetConcordia'
    default:
      return null
  }
})

watchDebounced(
  character,
  (newCharacter) => {
    updateCharacter({ ...newCharacter })
  },
  { debounce: 1000, deep: true }
)
</script>

<template>
  <Transition name="fade">
    <div
      v-if="pending"
      class="text-center fixed left-0 right-0 top-0 z-50">
      Sincronizando...
    </div>
  </Transition>
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
    <picture
      class="flex relative aspect-square -mt-16 -mx-6 md:max-w-sm md:mt-0 md:mx-auto z-0">
      <img
        v-if="character.imageUrl"
        class="w-full h-full object-cover md:rounded-full"
        :src="useImageUrl(character.imageUrl)" />
      <AvatarPlaceholder v-else />
      <ButtonUpload
        class="absolute bottom-1/3 left-1/2 -translate-x-1/2 md:top-0 md:right-0 md:translate-x-0 md:left-auto"
        id="upload-profile-image"
        label="Subir imagen de perfil"
        :pending="pending"
        @uploaded="onUploadImage"
        ><Icon
          name="mdi:camera"
          size="24"
      /></ButtonUpload>
    </picture>
    <article class="relative pb-4 z-10">
      <div class="grid gap-2 -mt-16 mb-16 mx-auto max-w-md">
        <EditableText
          class="text-3xl font-semibold"
          tag="h1"
          v-model="character.name" />
        <EditableText
          tag="p"
          v-model="character.description" />
      </div>
      <component
        v-if="character.system"
        :is="systemName"
        v-model:sheet="character.sheet" />
      <!-- TODO: Selector de sistema de juego -->
      <div v-else>Elige un sistema de juego</div>
      <Section title="Notas">
        <textarea
          v-model="character.notes"
          rows="6"
          placeholder="Escribe una nota"></textarea>
      </Section>
    </article>
  </main>
</template>

<style scoped>
main {
  width: min(calc(100% - 2rem), 768px);
}

picture {
  mask: linear-gradient(
    to bottom,
    white calc(100% - 8rem),
    hsl(0 0% 0% / 0%) 100%
  );
}
</style>
