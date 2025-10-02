<script setup lang="ts">
const { imageUrl, recipe } = useRecipeById()
</script>

<template>
  <LazyRecipesById v-if="recipe" :recipe :image-url />
  <LazyRecipesByIdSkeleton v-else />
</template>
