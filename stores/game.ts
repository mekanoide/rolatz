export const useGameStore = defineStore('game', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const games = ref<Game[]>([])

  /**
   * Fetches games from the 'users' table in the database based on the user's ID.
   *
   * @return {Promise<void>} A promise that resolves when the games are fetched.
   * @throws {Error} If there is an error fetching the games.
   */
  async function fetchGames(): Promise<void> {
    try {
      /*       const { data, error } = await supabase
        .from('games')
        .select()
        .eq('owner_id', user.value?.id)
        .order('created_at', { ascending: false }) */
      const { data, error } = await supabase
        .from('games')
        .select()
        .order('created_at', { ascending: false })
      if (error) throw error
      games.value = data
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Fetches a game from the 'games' table in the database based on the provided ID.
   *
   * @param {string} id - The ID of the game to fetch.
   * @return {Promise<Game | undefined>} A promise that resolves with the game data if found, or undefined if not found.
   * @throws {Error} If there is an error fetching the game.
   */
  async function fetchGame(id: string): Promise<Game | null> {
    try {
      const { data, error } = await supabase
        .from('games')
        .select()
        .eq('id', id)
        .single()
      if (error) throw error

      return data
    } catch (error) {
      console.error(error)
    }
    return null
  }

  /**
   * Fetches players in a game.
   *
   * @param {string} id - The ID of the game to fetch players for.
   * @return {Promise<Profile[]>} A promise that resolves with an array of profiles representing the players in the game.
   */
  async function fetchPlayersInGame(id: string): Promise<Profile[]> {
    try {
      const { data, error } = await supabase
        .from('games_users')
        .select('profile:user_id(id, name)')
        .eq('game_id', id)
      if (error) throw error
      const players = data.map((d) => d.profile)
      return players
    } catch (error) {
      console.error(error)
    }
    return []
  }

  /**
   * Fetches characters in a game.
   *
   * @param {string} id - The ID of the game to fetch characters for.
   * @return {Promise<Character[]>} A promise that resolves with an array of characters in the game.
   */
  async function fetchCharactersInGame(id: string): Promise<Character[]> {
    try {
      const { data, error } = await supabase
        .from('games_characters')
        .select('character:character_id(*)')
        .eq('game_id', id)
      if (error) throw error
      const players = data.map((d) => d.character)
      return players
    } catch (error) {
      console.error(error)
    }
    return []
  }

  /**
   * Creates a new game in the database with the owner ID of the current user.
   *
   * @return {Promise<any>} A promise that resolves with the newly created game data if successful, or rejects with an error if there was an issue.
   */
  async function createGame(): Promise<any> {
    try {
      console.log('User', user.value)
      if (!user.value || !user.value.id) return
      const { data, error } = await supabase
        .from('games')
        .insert({ name: 'Nueva partida', owner_id: user.value.id })
        .select()
        .single()
      if (error) throw error
      return data
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Updates a game in the database with the provided payload.
   *
   * @param {Partial<Game>} payload - The partial game object containing the updated data.
   * @return {Promise<any>} A promise that resolves with the updated game data if successful, or rejects with an error if there was an issue.
   */
  async function updateGame(payload: Partial<Game>): Promise<any> {
    try {
      if (!payload || !payload.id) return
      const { data, error } = await supabase
        .from('games')
        .update(payload)
        .eq('id', payload.id)
        .select()
      if (error) throw error
      return data
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Asynchronously expels a player from a game.
   *
   * @param {string} playerId - The ID of the player to expel.
   * @param {string} gameId - The ID of the game from which the player is expelled.
   * @return {Promise<any>} A promise that resolves with the expelled player data if successful, or rejects with an error if there was an issue.
   */
  async function expelPlayer(playerId: string, gameId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('games_users')
        .delete()
        .eq('game_id', gameId)
        .eq('user_id', playerId)
      if (error) throw error
      return data
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * A function to remove a character from a game.
   *
   * @param {string} characterId - The ID of the character to remove.
   * @param {string} gameId - The ID of the game from which the character is removed.
   * @return {Promise<any>} A promise that resolves with the result of the removal operation.
   */
  async function removeCharacter(
    characterId: string,
    gameId: string
  ): Promise<any> {
    try {
      console.log('Trying to remove Character', characterId, gameId)
      const { data, error } = await supabase
        .from('games_characters')
        .delete()
        .eq('game_id', gameId)
        .eq('character_id', characterId)
      if (error) throw error
      console.log('Response', data)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Joins a game by inserting a new record in the 'games_users' table.
   *
   * @param {string} gameId - The ID of the game to join.
   * @return {Promise<any>} A promise that resolves with the inserted data if successful, or rejects with an error if there was an issue.
   */
  async function joinGame(gameId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('games_users')
        .insert({ game_id: gameId, user_id: user.value.id })
        .select()
        .single()
      if (error) throw error
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    games,
    fetchGames,
    fetchPlayersInGame,
    fetchCharactersInGame,
    fetchGame,
    createGame,
    updateGame,
    expelPlayer,
    removeCharacter,
    joinGame
  }
})
