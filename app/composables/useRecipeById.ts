import type { TRecipeWithIngredientSteps } from '~~/server/api/recipes/type'

export default function () {
  // const supabase = useSupabaseClient()
  // const user = useSupabaseUser()
  const route = useRoute()

  const imageUrl = ref<string>()

  const recipeByKey = computed(() => `recipe-${route.params.id}`)

  const { data: recipe } = useNuxtData(recipeByKey.value)

  // TODO: récuperer l'image
  const { data, error } = useLazyAsyncData<TRecipeWithIngredientSteps>(
    recipeByKey.value,
    async () => {
      const recipe = await $fetch<TRecipeWithIngredientSteps>(
        `/api/recipes/${route.params.id}`
      )
      // const { data } = supabase.storage
      //   .from(BucketStorage.RECIPE_IMAGE)
      //   .getPublicUrl(`${user.value?.id}/${recipe.id}`)

      // imageUrl.value = data.publicUrl

      return recipe
    },
    {
      getCachedData() {
        return recipe.value
      },
      server: false,
    }
  )

  watch(error, () => {
    if (error.value) {
      throw createError({
        fatal: true,
      })
    }
  })

  return {
    imageUrl,
    recipe: data,
  }
}
