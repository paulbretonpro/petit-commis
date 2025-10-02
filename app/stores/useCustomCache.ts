import { defineStore } from 'pinia'

export const useMyUseCustomCacheStore = defineStore('cache', () => {
  const cache = ref(new Map())

  const resetCacheKey = () => {
    cache.value.clear('')
  }
  return {

  }
})
