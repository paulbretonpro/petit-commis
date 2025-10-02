import type { ICategory } from '~~/server/api/categories/type'

export default function () {
  const { data: categories } = useNuxtData<ICategory[]>('categories')

  const { data } = useFetch<ICategory[]>('/api/categories', {
    key: 'categories',
    getCachedData() {
      return categories.value
    },
    server: false,
  })

  return {
    categories: data,
  }
}
