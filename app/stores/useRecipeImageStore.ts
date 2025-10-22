import { defineStore } from 'pinia'

export const useRecipeImageStore = defineStore('recipe-image', () => {
  return {
    ...useCustomCacheFactory<string>(),
  }
})
