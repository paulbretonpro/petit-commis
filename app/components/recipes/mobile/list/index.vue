<script setup lang="ts">
import type { IRecipe } from '~~/server/api/recipes/type'

defineProps<{
  loading: boolean
  recipes: IRecipe[]
}>()
</script>

<template>
  <RecipesListSkeleton v-if="loading" />
  <template v-else>
    <div class="grid grid-cols-2 gap-4">
      <template v-if="recipes.length">
        <NuxtLink
          v-for="recipe in recipes"
          :key="recipe.id"
          :to="`/recipes/${recipe.id}`"
        >
          <RecipesCard :recipe />
        </NuxtLink>
      </template>

      <div v-else class="col-span-2 text-center text-sm font-medium">
        Aucune recette
      </div>
    </div>
  </template>
</template>
