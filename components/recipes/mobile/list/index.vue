<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'

defineProps<{
  recipes: IRecipe[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <NuxtLink v-for="recipe in recipes" :key="recipe.id" :to="`/recipes/${recipe.id}`">
      <RecipesCard :recipe />
    </NuxtLink>
  </div>
</template>