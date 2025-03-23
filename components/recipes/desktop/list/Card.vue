<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'

defineProps<{
  recipe: IRecipe
}>()
</script>
<template>
  <div class="border rounded-md p-4">
    <div class="font-medium">{{ recipe.name }}</div>
    <div class="text-gray-500">{{ recipe.description }}</div>
  </div>
</template>