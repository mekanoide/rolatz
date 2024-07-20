import { ref } from 'vue'
import { defineStore } from 'pinia'
import { characterPreviewList, characterList } from '@/test/data'

export const useCharacterStore = defineStore('character', () => {
  const characters = ref<Character[]>(characterPreviewList)
  const dummieCharacters = ref<ConcordiaCharacter[]>(characterList)
  const currentCharacter = ref(null)

  function fetchCharacter(id: number): ConcordiaCharacter {
    console.log('fetchCharacter', id)
    const chars = dummieCharacters.value
    console.log('characters in store', chars)
    const character: ConcordiaCharacter | undefined = chars.find(
      (item: { id: number }) => item.id == id
    )
    console.log('data fetched', character)
    return character
  }

  return {
    characters,
    currentCharacter,
    fetchCharacter
  }
})
