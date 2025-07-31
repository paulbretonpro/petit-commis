<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { IRecipe } from '~/server/api/recipes/type'

const { isMobile } = useDevice()
const { filters, loading } = storeToRefs(useRecipesStore())

const recipes = ref<IRecipe[]>([])
const loadingSkeleton = ref(true)

const fetchRecipes = useDebounceFn(async () => {
  loading.value = true
  try {
    recipes.value = await $fetch('/api/recipes', {
      method: 'GET',
      params: {
        ...filters.value,
      },
    })
  } catch {
    return []
  } finally {
    loading.value = false
  }
}, 300)

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
