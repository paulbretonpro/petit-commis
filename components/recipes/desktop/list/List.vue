<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'

// import type { IRecipeFilters } from '~/pages/index.vue'

// const props = defineProps<{
//   filters: IRecipeFilters
// }>()

const { data, status } = await useLazyFetch<IRecipe[]>(
  '/api/recipes',
  {
    key: 'recipes',
    // query: {
    //   ...props.filters
    // },
    // watch: [() => props.filters.categoryId],
    deep: true,
    default: () => []
  }
)

const pending = computed(() => status.value === 'pending')

const handleClickOnRecipe = (id: number) => navigateTo(`/recipes/${id}`)
</script>

<template>
  <div>
    <LazyRecipesDesktopListSkeleton v-if="pending" />
    <div class="grid grid-cols-2 gap-6">
      <RecipesDesktopListCard 
        v-for="recipe in data"
        :key="recipe.id"
        :recipe 
        @click="handleClickOnRecipe(recipe.id)"
      />
    </div>
  </div>
</template>