export default function useAuth() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  /**
   * Asynchronously logs in a user with the provided email.
   *
   * @param {string} email - The email of the user to log in.
   * @return {Promise<any>} A Promise that resolves with the data returned from the login attempt, or rejects with an error.
   */
  async function login(email: string): Promise<any> {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: process.env.REDIRECT_URL ?? 'http://localhost:3002'
        }
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating notes:', error)
    }
  }

  /**
   * A function to verify OTP for a given email and token.
   *
   * @param {string} email - The email for OTP verification.
   * @param {string} token - The token for OTP verification.
   * @return {Promise<any>} The response data after OTP verification.
   */
  async function verifyOtp(email: string, token: string): Promise<any> {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type: 'email'
      })
      console.log('Response', data, error)
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  /**
   * Asynchronously signs out the current user.
   *
   * @return {Promise<Error | undefined>} A Promise that resolves with an error if one occurred, or undefined if successful.
   */
  async function logout(): Promise<Error | undefined> {
    try {
      const { error }: { error: Error | undefined } = await supabase.auth.signOut()
      return error
    } catch (error: any) {
      console.error('Error fetching notes:', error)
      return error
    }
  }

  /**
   * Asynchronously fetches the user profile with the given ID.
   *
   * @param {string} id - The ID of the user to fetch the profile for.
   * @return {Promise<User | undefined>} A Promise that resolves with the user profile if found, or undefined if not found or an error occurred.
   */
  async function fetchUserProfile(id: string): Promise<User | undefined> {
    try {
      console.log('fetchUserProfile', id)
      const { data, error } = await supabase
        .from<User>('users')
        .select()
        .eq('id', id)
        .single()
      if (error) throw error
      console.log('Profile', data)
      return data?.data
    } catch (error: any) {
      console.error('Error fetching user profile:', error)
    }
  }

  return {
    login,
    verifyOtp,
    logout,
    fetchUserProfile
  }
}
