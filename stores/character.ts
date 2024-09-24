export const useCharacterStore = defineStore('character', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const characters = ref<Character[]>([])

  /**
   * Fetches characters from the 'characters' table in the database and updates the 'characters' store.
   *
   * @return {Promise<void>} A promise that resolves when the characters are fetched and the store is updated.
   * @throws {Error} If there is an error fetching the characters.
   */
  async function fetchCharacters(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('characters')
        .select()
        .eq('owner_id', user.value?.id)
        .order('last_used_at', { ascending: false })
      if (error) throw error
      characters.value = data
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Fetches a character from the 'dummieCharacters' store by its ID.
   *
   * @param {string} id - The ID of the character to fetch.
   * @return {Promise<ConcordiaCharacter | undefined>} A promise that resolves with the character if found, or undefined if not found.
   */
  async function fetchCharacter(
    id: string
  ): Promise<ConcordiaCharacter | undefined> {
    console.log('fetchCharacter', id)
    try {
      const { data, error } = await supabase
        .from('characters')
        .select()
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Create new character in the table 'characters' in the database.
   * @return {Promise<void>} A promise that resolves when the character is created.
   */
  async function createCharacter(): Promise<any> {
    try {
      console.log('User', user.value)
      if (!user.value || !user.value.id) return
      const { data, error } = await supabase
        .from('characters')
        .insert({ name: 'Nuevo personaje', owner_id: user.value.id })
        .select()
        .single()
      if (error) throw error
      return data
    } catch (error) {
      console.error(error)
    }
  }

  async function updateCharacter(payload: Partial<Character>): Promise<any> {
    try {
      if (!payload || !payload.id) return
      const { data, error } = await supabase
        .from('characters')
        .update(payload)
        .eq('id', payload.id)
        .select()
      if (error) throw error
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    characters,
    createCharacter,
    updateCharacter,
    fetchCharacters,
    fetchCharacter
  }
})
