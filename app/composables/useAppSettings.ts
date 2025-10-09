export default function () {
  const recipesStore = useRecipesStore()
  const { auth } = useSupabaseClient()

  const logout = async () => {
    recipesStore.clearCache()

    await auth.signOut()
    await refreshNuxtData()
    reloadNuxtApp()
    navigateTo('/login')
  }

  return {
    logout,
  }
}
