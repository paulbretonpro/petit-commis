import type { ICategory } from '~~/server/api/categories/type'

export default function () {
  const { data: categories, pending } = useFetch<ICategory[]>(
    '/api/categories',
    {
      key: 'categories',
      getCachedData() {
        return useNuxtData<ICategory[]>('categories').data.value
      },
      default: () => [],
      server: false,
    }
  )

  return {
    categories,
    loading: pending,
  }
}
