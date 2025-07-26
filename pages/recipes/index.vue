<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'

const { data: recipes } = useAsyncData<IRecipe[]>('recipes', () => $fetch('/api/recipes'), { server: false, default: () => [] })
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <NuxtLink v-for="recipe in recipes" :key="recipe.id" :to="`/recipes/${recipe.id}`">
      <UCard variant="subtle">
        <template #header>{{ recipe.name }}</template>
      </UCard>
    </NuxtLink>
  </div>
</template>