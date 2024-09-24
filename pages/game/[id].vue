<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { useGameStore } from '@/stores/game'
import { watchDebounced } from '@vueuse/core'
import { useDialogStore } from '@/stores/dialog'
import systems from '@/config/Systems'

const dialogStore = useDialogStore()
const user = useSupabaseUser()

const config = useRuntimeConfig()

const gameStore = useGameStore()
const route = useRoute()
const game = ref<Game | null>()
const players = ref<Profile[]>([])
const characters = ref<Character[]>([])
const pending = ref<boolean>(false)

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
game.value = await gameStore.fetchGame(id)
players.value = await gameStore.fetchPlayersInGame(id)
characters.value = await gameStore.fetchCharactersInGame(id)

const hasAlreadyJoined = computed(() => {
  return players.value.some((player: any) => player.id === user.value.id)
})

const shareLink = computed(() => {
  return `${config.public.baseUrl}/game/${id}`
})

function onCopyLink(): void {
  navigator.clipboard.writeText(shareLink.value)
}

async function onJoinGame(): Promise<void> {
  pending.value = true
  await gameStore.joinGame(id)
  game.value = await gameStore.fetchGame(id)
  pending.value = false
}

async function updateGame(data: any): Promise<void> {
  pending.value = true
  await gameStore.updateGame(data)
  pending.value = false
}

async function onRemoveCharacter(characterId: string): Promise<void> {
  await gameStore.removeCharacter(characterId, id)
  game.value = await gameStore.fetchGame(id)
}

async function onStartAssigningCharacter(characterId: string): Promise<void> {}

async function onExpelPlayer(playerId: string): Promise<void> {
  await gameStore.expelPlayer(playerId, id)
  game.value = await gameStore.fetchGame(id)
}

async function onDeleteGame(): Promise<void> {
  console.log('Delete game?')
  const confirmed = await dialogStore.open(
    '¿Seguro que quieres borrar esta partida?'
  )

  if (confirmed) {
    console.log('hey!')
  }
  /*     await gameStore.deleteGame(game.value.id)
    navigateTo('/') */
}

watchDebounced(
  game,
  (newGame) => {
    updateGame({ ...newGame })
  },
  { debounce: 1000, deep: true }
)
</script>

<template>
  <div
    v-if="pending"
    class="text-center fixed left-0 right-0 top-0 z-50">
    Sincronizando...
  </div>
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
    <!--     <p>{{ game }}</p>
    <p>{{ players }}</p> -->
    <!-- <figure
      class="relative aspect-square -mt-16 -mx-6 md:max-w-sm md:mt-0 md:mx-auto z-0">
      <img
        v-if="game.imageUrl"
        class="w-full h-full object-cover md:rounded-full"
        :src="useImageUrl(game.imageUrl)" />
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
    </figure> -->
    <article class="relative pb-4">
      <section class="flex gap-4 items-start">
        <div class="flex-1">
          <div class="grid gap-2 mb-16">
            <EditableText
              class="text-3xl font-semibold"
              tag="h1"
              v-model="game.name" />
            <EditableText
              tag="p"
              v-model="game.description" />
            <!--             <input
              class="text-3xl mb-2"
              type="text"
              v-model="game.name"
              placeholder="Nombre de la partida" />
            <textarea
              type="text"
              rows="2"
              v-model="game.description"
              placeholder="Descripción de la partida" /> -->
          </div>
        </div>
        <Button
          v-if="!hasAlreadyJoined"
          class="text-amber-500"
          @click="onJoinGame"
          >Unirse</Button
        >
      </section>
      <div class="grid gap-8 md:grid-cols-[2fr_1fr]">
        <section>
          <header class="flex justify-between items-center h-8 mb-4">
            <h2 class="text-xl font-semibold">Personajes</h2>
            <div class="flex gap-2">
              <!--               <Button size="small"
              @click.stop="">Traer personajes</Button> -->
              <Button
                size="small"
                variant="primary">
                Crear personaje
              </Button>
            </div>
          </header>
          <div
            v-if="characters && characters.length > 0"
            class="grid gap-4">
            <Card
              v-for="character in characters"
              class="cursor-pointer p-2 hover:outline hover:outline-2 hover:outline-stone-400">
              <CharacterPreview
                :data="character"
                :hasMenu="true"
                @click="navigateTo(`/character/${character.id}`)">
                <template #menu>
                  <MenuItem
                    @click.stop="onStartAssigningCharacter(character.id)"
                    >Asignar a jugador</MenuItem
                  >
                  <MenuItem @click.stop="onRemoveCharacter(character.id)">
                    Eliminar de la partida
                  </MenuItem>
                </template>
              </CharacterPreview>
            </Card>
          </div>
          <EmptyState v-else>No hay personajes</EmptyState>
        </section>
        <section>
          <header class="h-8 mb-4">
            <h2 class="font-semibold text-xl">Jugadores</h2>
          </header>
          <div
            class="grid gap-4 mb-4"
            v-if="game && players && players.length > 0">
            <PlayerPreview
              v-for="player in players"
              :data="player"
              :owner="user.id === game.owner_id"
              @expel="onExpelPlayer" />
          </div>
          <EmptyState v-else>No hay jugadores</EmptyState>
          <!--           <div>
              <h3 class="mb-2">Invita a jugadores compartiendo este enlace</h3>
              <CopiableLink :text="shareLink" />
            </div> -->
        </section>
      </div>
    </article>
  </main>
</template>
