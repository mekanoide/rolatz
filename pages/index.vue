<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { useCharacterStore } from '@/stores/character'
import { useGameStore } from '@/stores/game'

const characterStore = useCharacterStore()
const gameStore = useGameStore()

const activeSection = ref('games')

async function onCreateCharacter() {
  const character = await characterStore.createCharacter()
  navigateTo(`/character/${character.id}`)
}

function onClickCharacter(id: string) {
  navigateTo(`/character/${id}`)
}

async function onCreateGame() {
  const game = await gameStore.createGame()
  navigateTo(`/game/${game.id}`)
}

async function fetchCharacters() {
  await characterStore.fetchCharacters()
}
async function fetchGames() {
  await gameStore.fetchGames()
}

fetchGames()
fetchCharacters()
</script>

<template>
  <Header></Header>
  <nav class="pt-4 flex gap-4 justify-center sticky top-0 bg-stone-950">
    <Tab
      :selected="activeSection === 'games'"
      @select="activeSection = 'games'">
      Partidas
    </Tab>
    <Tab
      :selected="activeSection === 'characters'"
      @select="activeSection = 'characters'">
      Personajes
    </Tab>
  </nav>
  <main>
    <section v-if="activeSection === 'characters'">
      <Button
        class="mb-4"
        variant="primary"
        @click="onCreateCharacter">
        Crear personaje
      </Button>
      <CardList
        v-if="
          characterStore.characters && characterStore.characters.length > 0
        ">
        <Card
          v-for="character in characterStore.characters"
          class="cursor-pointer grid-cols-[auto_1fr_auto] items-start hover:outline hover:outline-2 hover:outline-stone-400"
          role="button"
          @click.stop="navigateTo(`/character/${character.id}`)">
          <CharacterPreview :data="character">
            <template #menu>
              <MenuItem @click.stop="onStartAssigningCharacter(character.id)">
                Asignar a partida
              </MenuItem>
              <MenuItem @click.stop="onRemoveCharacter(character.id)">
                Eliminar de la partida
              </MenuItem>
            </template>
          </CharacterPreview>
        </Card>
      </CardList>
      <h2
        v-else
        class="text-center text-stone-600">
        No hay personajes
      </h2>
    </section>
    <section v-else-if="activeSection === 'games'">
      <Button
        class="mb-4"
        variant="primary"
        @click="onCreateGame">
        Crear partida
      </Button>
      <CardList v-if="gameStore.games && gameStore.games.length > 0">
        <Card
          v-for="game in gameStore.games"
          class="cursor-pointer hover:outline hover:outline-2 hover:outline-stone-400 p-4"
          @click.stop="navigateTo(`/game/${game.id}`)">
          <GamePreview :data="game" />
        </Card>
      </CardList>
      <h2
        v-else
        class="text-center text-stone-600">
        No hay partidas
      </h2>
    </section>
  </main>
</template>
