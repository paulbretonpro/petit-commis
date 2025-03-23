import type { ICategory } from "~/server/api/categories/type"

export default async function () {
  const { data: categories, status } = await useFetch<ICategory[]>('/api/categories', {
    key: 'categories',
    default: () => []
  })
  
  const pending = computed(() => status.value === 'pending')

  return {
    categories,
    pending
  }
}