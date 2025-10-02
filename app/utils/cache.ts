export function useCustomCacheFactory<T>() {
  const cache = ref<Map<string, T>>(new Map())

  const resetCacheKey = (key: string) => {
    cache.value.delete(key)
  }

  const setCacheKey = (key: string, value: T) => {
    cache.value.set(key, value)
  }

  const clearCache = () => cache.value.clear()

  return {
    cache,
    clearCache,
    resetCacheKey,
    setCacheKey,
  }
}
