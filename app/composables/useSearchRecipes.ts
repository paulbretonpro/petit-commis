import type { IRecipe } from '~~/server/api/recipes/type'

export default function () {
  const recipeStore = useRecipesStore()
  const { loading, filters, cache, recipes } = storeToRefs(recipeStore)

  const fetchRecipes = async () => {
    loading.value = true

    const key = `recipes-${Object.values(filters.value)
      .filter((value) => !!value && String(value).trim().length)
      .join('-')}`

    try {
      if (cache.value.has(key)) {
        recipes.value = cache.value.get(key) ?? []
        return
      }

      const newRecipes = await $fetch<IRecipe[]>('/api/recipes', {
        method: 'GET',
        params: {
          search: filters.value.search,
          categoryId: filters.value.categoryId,
        },
      })

      recipeStore.setCacheKey(key, newRecipes)

      recipes.value = newRecipes
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    fetchRecipes,
    filters,
    loading,
    recipes,
  }
}
