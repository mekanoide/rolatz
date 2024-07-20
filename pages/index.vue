<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { ref } from 'vue'

const characterStore = useCharacterStore()

const activeSection = ref('characters')
</script>

<template>
  <Header></Header>
  <nav class="pt-4 flex gap-4 justify-center sticky top-0 bg-stone-950">
    <Tab
      :selected="activeSection === 'characters'"
      @select="activeSection = 'characters'">
      Personajes
    </Tab>
    <Tab
      :selected="activeSection === 'games'"
      @select="activeSection = 'games'">
      Partidas
    </Tab>
  </nav>
  <main class="p-4">
    <section v-if="activeSection === 'characters'">
      <CardList>
        <CharacterCard
          v-for="character in characterStore.characters"
          :data="character" />
      </CardList>
    </section>
    <section v-else-if="activeSection === 'games'">
      <Cardlist>
        <li>Partida 1</li>
        <li>Partida 2</li>
        <li>Partida 3</li>
      </Cardlist>
    </section>
  </main>
</template>
