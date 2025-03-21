<script setup lang="ts">
import { Icon } from '@iconify/vue'

export interface IRecipeFilters {
  categoryId?: number
  ingredientIds?: number[]
  search?: string
}

const filters = ref<IRecipeFilters>({
  categoryId: undefined,
  ingredientIds: [],
  search: undefined,
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <div class="text-lg font-bold">Mes Recettes</div>
      <Button>
        <Icon icon="radix-icons:plus" />
        Nouvelle recette
      </Button>
    </div>
    <div class="flex gap-6">
      <RecipesFiltersPanel v-model="filters" />

      <div class="flex flex-col gap-6 grow">
        <RecipesList :filters />
      </div>
    </div>
  </div>
</template>