<script setup lang="ts">
const { recipe } = useRecipeById()
</script>

<template>
  <LazyRecipesById v-if="recipe" :recipe />
  <LazyRecipesByIdSkeleton v-else />
</template>
