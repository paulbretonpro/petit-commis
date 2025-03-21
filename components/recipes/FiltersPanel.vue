<script setup lang="ts">
import type { IRecipeFilters } from '~/pages/index.vue'

const filters = defineModel<IRecipeFilters>({ required: true })
</script>

<template>
  <div class="border rounded-md p-4 w-[300px] flex flex-col gap-4 h-fit">
    <div class="text-lg font-semibold">Filtres</div>
    <div class="flex flex-col gap-2">
      <Label>Recherche</Label>
      <Input v-model="filters.search" placeholder="Ex: pâte carbo" />
    </div>
    <Suspense>
      <RecipesCategories v-model="filters.categoryId" />

      <template #fallback>Loading ...</template>
    </Suspense>
    <RecipesIngredients />
  </div>
</template>