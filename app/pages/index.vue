<script setup lang="ts">
const { isMobile } = useDevice()

const { recipes, loading } = useSearchRecipes()
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <UButton
      label="Créer une recette"
      icon="material-symbols:add-rounded"
      class="self-end"
      @click="() => navigateTo('/recipes/create')"
    />

    <LazyRecipesMobileList
      v-if="isMobile"
      :recipes
      :loading
    />
    <LazyRecipesDesktopList v-else :recipes :loading />

    <RecipesMobileListFilters v-if="isMobile" />
  </div>
</template>
