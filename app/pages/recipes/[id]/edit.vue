<script setup lang="ts">
import type {
  IRecipe,
  TRecipeWithIngredientSteps,
} from '~~/server/api/recipes/type'
import {
  RecipeFormCreateSchema,
  type TRecipeFormCreate,
} from '~/utils/types/recipes'

const FIELD_NAME: Record<string, string> = {
  name: 'nom de la recette',
  category: 'catégorie',
}

const toast = useToast()
const route = useRoute()

const fullScreenLoaderStore = useFullScreenLoader()

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

const { data: recipeCached } = useNuxtData(recipeByIdKey.value)

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

const onSubmit = async () => {
  const state = RecipeFormCreateSchema.safeParse({
    ...formCreateRecipe.value,
    ingredients: formCreateRecipe.value.ingredients.map((ingredient) => ({
      ...ingredient,
      ingredientId: ingredient.ingredient?.id,
    })),
    hasImage: !!formCreateRecipe.value.image,
  })

  if (state.error) {
    const fieldsError = [
      ...new Set(
        state.error.issues.map(
          (err) => FIELD_NAME[err.path[0] as string as keyof FIELD_NAME]
        )
      ),
    ]

    toast.add({
      title: 'Champ requis',
      description: `Les champs: ${fieldsError.join(', ')} sont invalides`,
      color: 'error',
    })

    return
  }

  try {
    fullScreenLoaderStore.show('Votre recette est en cours de préparation ...')

    await $fetch<{ data: IRecipe }>(`/api/recipes/${route.params.id}`, {
      method: 'PUT',
      body: {
        ...state.data,
      },
    })

    toast.add({
      title: 'Succès',
      description: 'Votre recette est prête à être cuisinée',
      color: 'success',
    })

    await refreshNuxtData(recipeByIdKey.value)

    await navigateTo('/recipes')
  } catch {
    toast.add({
      title: 'Echec',
      description: "Impossible d'ajouter votre recette, veuillez réassayer",
      color: 'error',
    })
  } finally {
    fullScreenLoaderStore.hide()
  }
}

onMounted(getRecipeById)
</script>

<template>
  <LazyRecipesByIdSkeleton v-if="loading" />
  <LazyRecipesCreate
    v-else
    v-model:form="formCreateRecipe"
    @submit="onSubmit"
  />
</template>
