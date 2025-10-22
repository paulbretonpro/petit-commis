import type { TRecipeWithIngredientSteps } from '~~/server/api/recipes/type'

export default function () {
  const route = useRoute()

  const recipeByKey = computed(() => `recipe-${route.params.id}`)

  const { data: recipe } = useNuxtData(recipeByKey.value)

  const { data, error } = useLazyAsyncData<TRecipeWithIngredientSteps>(
    recipeByKey.value,
    async () => {
      const recipe = await $fetch<TRecipeWithIngredientSteps>(
        `/api/recipes/${route.params.id}`
      )

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
    recipe: data,
  }
}
