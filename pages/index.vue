<script setup lang="ts">
export interface IRecipeFilters {
  categoryId?: number
  search?: string
}

const filters = ref<IRecipeFilters>({
  categoryId: undefined,
  search: undefined
})
</script>

<template>
  <div class="flex gap-6">
    <RecipesFiltersPanel v-model="filters" />

    <div class="flex flex-col gap-6 grow">
      <RecipesList :filters />
    </div>
  </div>
</template>