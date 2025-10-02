import { defineStore } from 'pinia'

export interface IRecipeFilters {
  categoryId?: number
  search?: string
}

export const useRecipesStore = defineStore('recipes', () => {
  const loading = ref(true)

  const filters = ref<IRecipeFilters>({
    search: undefined,
    categoryId: undefined,
  })

  const handleResetFilter = () => {
    filters.value.categoryId = undefined
    filters.value.search = undefined
  }

  return {
    filters,
    handleResetFilter,
    loading,
  }
})
