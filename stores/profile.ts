export const useProfileStore = defineStore('profile', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const me = ref<Profile | null>(null)
  /**
   * Fetches the profile associated with the current user, if any.
   *
   * If the user is not logged in, or the profile has already been fetched,
   * this function does nothing. Otherwise, it fetches the profile from the
   * database and stores it in the `me` ref.
   *
   * @returns A Promise that resolves when the profile has been fetched,
   * or rejects if there is an error.
   */
  async function fetchMe(): Promise<void> {
    try {
      if (!user.value) return
      if (me.value) return
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.value.id)
        .single()
      if (error) throw error
      me.value = data
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Fetches a profile from the 'profiles' table by its ID.
   *
   * @param {string} id - The ID of the profile to fetch.
   * @return {Promise<Profile | undefined>} A promise that resolves with the profile if found, or undefined if not found.
   * @throws {Error} If there is an error fetching the profile.
   */
  async function fetchProfile(id: string): Promise<Profile | undefined> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    } catch (error) {
      console.error(error)
    }
  }

  async function updateName(name: string) {
    try {
      if (!me.value) return
      const { error } = await supabase
        .from('profiles')
        .update({ name: name })
        .eq('id', me.value?.id)
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  return { me, fetchMe, fetchProfile, updateName }
})
