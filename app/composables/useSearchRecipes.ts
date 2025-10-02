import { useDebounceFn } from '@vueuse/core'
import type { IRecipe } from '~~/server/api/recipes/type'

export default function () {
  const { loading, filters, fakeCache } = storeToRefs(useRecipesStore())

  const recipes = ref<IRecipe[]>([])
  const filtersDebounced = ref<IRecipeFilters>({})

  const keyReactive = computed(() => `recipes-${Object.values(filtersDebounced.value).filter(value => !!value && String(value).trim().length).join('-')}`)

  const fetchRecipes = async () => {
    loading.value = true

    if (fakeCache.has(keyReactive.value)) {

    }
    
    await $fetch('/api/recipes', {
      method: 'GET',
      params: {
        search: filtersDebounced.value.search,
        categoryId: filtersDebounced.value.categoryId,
      },
    })

    loading.value = false
  } 

  watch(
    filters, 
    useDebounceFn(async () => {
      filtersDebounced.value = { ...filters.value }
    }, 600), 
    { deep: true }
  )

  setNuxt

  watch(keyReactive, () => console.log(keyReactive.value))

  return {
    loading,
    recipes: data,
  }
}
