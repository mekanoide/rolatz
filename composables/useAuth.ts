export default function useAuth() {
  const supabase = useSupabaseClient()

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
      if (error) return error
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
      const { error } = await supabase.auth.signOut()
      if (error) return error
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  return {
    login,
    verifyOtp,
    logout
  }
}
