<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { IRecipe } from '~/server/api/recipes/type'

const { isMobile } = useDevice()
const { filters } = storeToRefs(useRecipesStore())

const recipes = ref<IRecipe[]>([])
const loading = ref(true)

const fetchRecipes = useDebounceFn(async () => {
  try {
    recipes.value = await $fetch('/api/recipes', {
      method: 'GET',
      params: {
        ...filters.value
      }
    })
  } catch {
    return []
  }
}, 300)

watch(filters, fetchRecipes, { deep: true })

onMounted(async () => {
  loading.value = true
  await fetchRecipes()
  loading.value = false
})
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <UButton label="Créer une recette" class="self-end" @click="() => navigateTo('/recipes/create')" />
        
    <LazyRecipesMobileList v-if="isMobile" :recipes />
    <LazyRecipesDesktopList v-else :recipes :loading />
  </div>
</template>