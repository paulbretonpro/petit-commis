<script setup lang="ts">
const { isMobile } = useDevice()

const { recipes, fetchRecipes } = useSearchRecipes()

const skeletonLoading = ref(true)

onMounted(async () => {
  skeletonLoading.value = true
  await fetchRecipes()
  skeletonLoading.value = false
})
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <UButton
      label="Créer une recette"
      icon="material-symbols:add-rounded"
      class="self-end"
      @click="() => navigateTo('/recipes/create')"
    />

    <!-- Mobile -->
    <LazyRecipesMobileList
      v-if="isMobile"
      :recipes
      :loading="skeletonLoading"
    />
    <RecipesMobileListFilters v-if="isMobile" />

    <!-- desktop -->
    <LazyRecipesDesktopList v-else :recipes :loading="skeletonLoading" />
  </div>
</template>
