import { defineStore } from 'pinia'

export const useRecipesStore = defineStore('recipes', () => {
  const filters = ref({
    search: undefined,
    categoryId: undefined
  })

  return {
    filters
  }
})
