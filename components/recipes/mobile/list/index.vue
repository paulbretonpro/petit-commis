<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'

defineProps<{
  loading: boolean
  recipes: IRecipe[]
}>()
</script>

<template>
  <RecipesListSkeleton v-if="loading" />
  <div v-else class="grid grid-cols-2 gap-4">
    <NuxtLink v-for="recipe in recipes" :key="recipe.id" :to="`/recipes/${recipe.id}`">
      <RecipesCard :recipe />
    </NuxtLink>
  </div>
</template>