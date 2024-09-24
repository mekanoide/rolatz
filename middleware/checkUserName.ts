export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  console.log('Middleware checkUserName')

  // Si el usuario no está autenticado, no hacemos nada
  if (!user.value) {
    return
  }

  // Obtener el perfil del usuario
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', user.value.id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return navigateTo('/error') // Redirigir a una página de error si es necesario
  }

  // Redirigir a /name si el nombre no está definido
  if (profile.name) {
    return navigateTo('/')
  }
})
