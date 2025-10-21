import type { IIngredient } from '~~/server/api/ingredients/type'

export default function () {
  // const { data: ingredients } = useNuxtData<IIngredient[]>('ingredients')

  // TODO: get ingredients cache
  const { data } = useFetch<IIngredient[]>('/api/ingredients', {
    key: 'ingredients',
    // getCachedData() {
    //   return ingredients.value
    // },
    default: () => [],
    server: false,
  })

  return {
    ingredients: data,
  }
}
