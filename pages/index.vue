<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'

const { isMobile } = useDevice()

const { data: recipes } = useAsyncData<IRecipe[]>('recipes', () => $fetch('/api/recipes'), { server: false, default: () => [] })
</script>

<template>
  <LazyRecipesMobileList v-if="isMobile" :recipes />
  <LazyRecipesDesktopList v-else :recipes />
</template>