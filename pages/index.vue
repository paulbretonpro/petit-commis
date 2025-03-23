<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <LazyRecipesMobile v-if="isMobile" />
  <LazyRecipesDesktop v-else />
</template>