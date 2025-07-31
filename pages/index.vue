<script setup lang="ts">
const { isMobile } = useDevice()
const { filters } = storeToRefs(useRecipesStore())

const { fetchRecipes, recipes } = useSearchRecipes(filters.value)

const loadingSkeleton = ref(true)

watch(filters, fetchRecipes, { deep: true })

onMounted(async () => {
  loadingSkeleton.value = true
  await fetchRecipes()
  loadingSkeleton.value = false
})
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <UButton
      label="Créer une recette"
      class="self-end"
      @click="() => navigateTo('/recipes/create')"
    />

    <LazyRecipesMobileList
      v-if="isMobile"
      :recipes
      :loading="loadingSkeleton"
    />
    <LazyRecipesDesktopList v-else :recipes :loading="loadingSkeleton" />

    <RecipesMobileListFilters v-if="isMobile" />
  </div>
</template>
