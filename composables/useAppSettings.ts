export default function () {
  const { auth } = useSupabaseClient()

  const logout = async () => {
    await auth.signOut()
    navigateTo('/login')
  }

  return {
    logout
  }
}