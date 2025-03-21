<script setup lang="ts">
import type { IRecipeFilters } from '~/pages/index.vue'

const filters = defineModel<IRecipeFilters>({ required: true })

const handleResetFilters = () => {
  filters.value.categoryId = undefined
  filters.value.ingredientIds = []
  filters.value.search = undefined  
}
</script>

<template>
  <div class="border rounded-md p-4 w-[300px] flex flex-col gap-4 h-fit">
    <div class="flex flex-col gap-2">
      <Label>Recherche</Label>
      <Input v-model="filters.search" placeholder="Ex: pâte carbo" />
    </div>

    <Suspense>
      <RecipesCategories v-model="filters.categoryId" />
      <template #fallback>
        <SkeletonSelect />
      </template>
    </Suspense>

    <Suspense>
      <RecipesIngredients v-model="filters.ingredientIds" />
      <template #fallback>
        <SkeletonSelect />
      </template>
    </Suspense>

    <Button variant="outline" @click="handleResetFilters">Réinitialiser</Button>
  </div>
</template>