<script setup lang="ts">
// import type { IRecipeFilters } from '~/pages/index.vue'

// const props = defineProps<{
//   filters: IRecipeFilters
// }>()

// const { status } = await useLazyFetch(
//   '/api/recipes',
//   {
//     key: 'recipes',
//     query: {
//       ...props.filters
//     },
//     watch: [() => props.filters.categoryId],
//     deep: true,
//     default: () => []
//   }
// )

// const pending = computed(() => status.value === 'pending')
</script>

<template>
  <RecipesListSkeleton />
</template>