<script setup lang="ts">
import type { IRecipe } from '~~/server/api/recipes/type'

defineProps<{
  loading: boolean
  recipes: IRecipe[]
}>()
</script>

<template>
  <div v-auto-animate class="grid grid-cols-[18rem_auto] gap-6">
    <div class="sticky top-20 z-50 h-fit">
      <RecipesDesktopListFilters />
    </div>

    <RecipesListSkeleton v-if="loading" class="grow" />

    <div
      v-else-if="recipes.length"
      v-auto-animate
      class="grow grid grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <NuxtLink
        v-for="recipe in recipes"
        :key="recipe.id"
        :to="`/recipes/${recipe.id}`"
      >
        <RecipesCard :recipe />
      </NuxtLink>
    </div>

    <div v-else class="grow text-center p-8 text-sm font-medium">
      Aucune recette
    </div>
  </div>
</template>
