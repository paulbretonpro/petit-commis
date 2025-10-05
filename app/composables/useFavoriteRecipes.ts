import type { IIngredient } from '~~/server/api/ingredients/type'
import type { IRecipe } from '~~/server/api/recipes/type'

export default function () {
  const { data: favoriteRecipes } =
    useNuxtData<IIngredient[]>('favorite-recipes')

  const { data, pending } = useFetch<Partial<IRecipe>[]>(
    '/api/favorites/recipes',
    {
      key: 'favorite-recipes',
      getCachedData() {
        return favoriteRecipes.value
      },
      default: () => [],
      server: false,
    }
  )

  const loading = computed(() => pending.value)

  return {
    favoriteRecipes: data,
    loading,
  }
}
