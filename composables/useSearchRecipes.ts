import { useDebounceFn } from '@vueuse/core'
import type { IRecipe } from '~/server/api/recipes/type'

export default function (filters: IRecipeFilters) {
  const { loading } = storeToRefs(useRecipesStore())

  const recipes = ref<IRecipe[]>([])

  const fetchRecipes = useDebounceFn(async () => {
    loading.value = true
    try {
      recipes.value = await $fetch('/api/recipes', {
        method: 'GET',
        params: {
          search: filters.search,
          categoryId: filters.categoryId,
        },
      })
    } catch {
      return []
    } finally {
      loading.value = false
    }
  }, 300)

  return {
    fetchRecipes,
    loading,
    recipes,
  }
}
