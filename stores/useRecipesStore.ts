import { defineStore } from 'pinia'

export const useRecipesStore = defineStore('recipes', () => {
  const loading = ref(true)

  const filters = ref({
    search: undefined,
    categoryId: undefined
  })
  
  const handleResetFilter = () => {
    filters.value.categoryId = undefined
    filters.value.search = undefined
  }

  return {
    filters,
    handleResetFilter,
    loading
  }
})
