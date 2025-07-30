<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'

const { isMobile } = useDevice()

const { data: recipes, pending } = useAsyncData<IRecipe[]>('recipes', () => $fetch('/api/recipes'), { server: false, default: () => [] })
</script>

<template>
  <div class="flex flex-col gap-4">
    <UButton label="Créer une recette" class="self-end" @click="() => navigateTo('/recipes/create')" />
      <RecipesListSkeleton v-if="pending" />
      <template v-else>
        <LazyRecipesMobileList v-if="isMobile" :recipes />
        <LazyRecipesDesktopList v-else :recipes />
      </template>
  </div>
</template>