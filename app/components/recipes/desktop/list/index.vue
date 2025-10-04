<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { IRecipe } from '~~/server/api/recipes/type'

defineProps<{
  loading: boolean
  recipes: IRecipe[]
}>()

const { fetchRecipes, filters } = useSearchRecipes()

const fetchRecipesDebounce = useDebounceFn(fetchRecipes, 600)

watch(filters, fetchRecipesDebounce, {
  deep: true,
})
</script>

<template>
  <PageHeader title="Recettes">
    <UButton
      label="Créer une recette"
      icon="material-symbols:add-rounded"
      class="self-end"
      @click="() => navigateTo('/recipes/create')"
    />
  </PageHeader>

  <div class="grid grid-cols-[18rem_auto] gap-6">
    <div class="sticky top-20 z-50 h-fit">
      <RecipesDesktopListFilters />
    </div>

    <RecipesListSkeleton v-if="loading" class="grow" />

    <div
      v-else-if="recipes.length"
      v-auto-animate
      class="grow grid grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <NuxtLink
        v-for="recipe in recipes"
        :key="recipe.id"
        :to="`/recipes/${recipe.id}`"
      >
        <SharedCardRecipe :recipe />
      </NuxtLink>
    </div>

    <div v-else class="grow text-center p-8 text-sm font-medium">
      Aucune recette
    </div>
  </div>
</template>
