<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'

defineProps<{
  recipe: IRecipe
}>()
</script>
<template>
  <div class="border flex flex-col gap-2 rounded-md p-4 cursor-pointer">
    <div class="flex justify-between items-center">
      <div class="font-medium">{{ recipe.name }}</div>
      <Badge variant="secondary">{{ recipe.category?.name }}</Badge>
    </div>
    <div class="text-gray-500 line-clamp-3">{{ recipe.description }}</div>
  </div>
</template>