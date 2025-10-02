import { defineStore } from 'pinia'
import type { IRecipe } from '~~/server/api/recipes/type'

export interface IRecipeFilters {
  categoryId?: number
  search?: string
}

export const useRecipesStore = defineStore('recipes', () => {
  const loading = ref(true)
  const recipes = ref<IRecipe[]>([])

  const filters = ref<IRecipeFilters>({
    search: undefined,
    categoryId: undefined,
  })

  const handleResetFilter = () => {
    filters.value.categoryId = undefined
    filters.value.search = undefined
  }

  return {
    ...useCustomCacheFactory<IRecipe[]>(),
    filters,
    handleResetFilter,
    loading,
    recipes,
  }
})
