<script setup lang="ts">
import type { TRecipeWithIngredientSteps } from '~~/server/api/recipes/type'
import type { TRecipeFormCreate } from '~/utils/types/recipes'

const route = useRoute()

const formCreateRecipe = ref<TRecipeFormCreate>({
  category: undefined,
  description: undefined,
  image: undefined,
  ingredients: [],
  isPublic: false,
  name: undefined,
  nbPersons: 2,
  steps: [],
})

const loading = ref(true)

const recipeByIdKey = computed(() => `recipe-${route.params.id}`)

const { data: recipeCached } = useNuxtData<TRecipeWithIngredientSteps>(
  recipeByIdKey.value
)

const getRecipeById = async () => {
  loading.value = true
  try {
    const recipe =
      recipeCached.value ||
      (await $fetch<TRecipeWithIngredientSteps>(
        `/api/recipes/${route.params.id}`
      ))

    formCreateRecipe.value.category = recipe.categoryId
    formCreateRecipe.value.description = recipe.description ?? ''
    formCreateRecipe.value.name = recipe.name
    formCreateRecipe.value.nbPersons = recipe.nbPersons
    formCreateRecipe.value.steps = recipe.steps
    formCreateRecipe.value.ingredients = recipe.ingredients.map(
      (ingredient) => ({
        ingredient,
        quantity: Number(ingredient.quantity),
        unit: ingredient.unit,
      })
    )
  } finally {
    loading.value = false
  }
}

// Chargement de la recette
getRecipeById()
</script>

<template>
  <LazyRecipesByIdSkeleton v-if="loading" />
  <LazyRecipesFormEdit v-else v-model:form="formCreateRecipe" />
</template>
