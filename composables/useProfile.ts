export default function useProfile() {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  const profile = ref<Profile | null>(null)

  onMounted(async () => {
    if (!user.value) return
    if (profile.value) return profile.value
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name')
      .eq('id', user.value.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
    } else {
      profile.value = data
    }
  })

  return profile.value
}
