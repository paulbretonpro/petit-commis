import { useDebounceFn } from '@vueuse/core'
import type { IRecipe } from '~~/server/api/recipes/type'

export default function (filters: IRecipeFilters) {
  const { loading } = storeToRefs(useRecipesStore())

  const recipes = ref<IRecipe[]>([])

  const fetchRecipes = useDebounceFn(async () => {
    loading.value = true
    try {
      const { data } = await useAsyncData<IRecipe[]>(
        'recipes',
        () =>
          $fetch('/api/recipes', {
            method: 'GET',
            params: {
              search: filters.search,
              categoryId: filters.categoryId,
            },
          }),
        {
          default: () => [],
        }
      )

      recipes.value = data.value
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
