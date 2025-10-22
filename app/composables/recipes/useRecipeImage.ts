import type { Database } from '~~/database.types'

export default function () {
  const user = useSupabaseUser()
  const { setCacheKey, resetCacheKey } = useRecipeImageStore()
  const { cache } = storeToRefs(useRecipeImageStore())

  const imageUrl = ref<string>()

  const getImage = async (
    recipeId: string | number,
    options?: { transform?: { width?: number; height?: number } }
  ) => {
    const cacheKey = `${user.value?.id}-${recipeId}`

    if (cache.value.has(cacheKey)) {
      imageUrl.value = cache.value.get(cacheKey)!
      return
    }

    const supabase = useSupabaseClient<Database>()

    try {
      const { data } = await supabase.storage
        .from(BucketStorage.RECIPE_IMAGE)
        .createSignedUrl(`${user.value?.id}/${recipeId}`, 60, options)

      imageUrl.value = data?.signedUrl

      setCacheKey(cacheKey, imageUrl.value!)
    } catch {
      console.error("Erreur lors de la récupération de l'image de la recette")
    }
  }

  const handleResetCacheKey = (recipeId: string | number) => {
    resetCacheKey(`${user.value?.id}-${recipeId}`)
    imageUrl.value = undefined
  }

  return {
    imageUrl,
    getImage,
    handleResetCacheKey,
  }
}
