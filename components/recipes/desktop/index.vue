<script setup lang="ts">
import { NuxtLink, RecipesDesktopFiltersPanel } from '#components'
import { Icon } from '@iconify/vue'

export interface IRecipeFilters {
  categoryId?: number
  ingredientIds?: number[]
  search?: string
}

const filters = ref<IRecipeFilters>({
  categoryId: undefined,
  ingredientIds: [],
  search: undefined
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <div class="text-lg font-bold">Mes Recettes</div>
      <NuxtLink to="/recipes/create">
        <Button>
          <Icon icon="radix-icons:plus" />
          Nouvelle recette
        </Button>
      </NuxtLink>
    </div>
    <div class="flex gap-6">
      <RecipesDesktopFiltersPanel v-model="filters" />

      <div class="flex flex-col gap-6 grow">
        <RecipesDesktopList :filters />
      </div>
    </div>
  </div>
</template>