<script setup lang="ts">
import type { IRecipe } from '~/server/api/recipes/type'
import { BucketStorage } from '~/server/type'
import {
  RecipeFormCreateSchema,
  type TRecipeFormCreate,
} from '~/utils/types/recipes'

const toast = useToast()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

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
    toast.add({
      title: 'Champ requis',
      description: `Les champs: ${state.error.issues?.map((err) => err.path[0]).join(', ')} sont invalides`,
      color: 'error',
    })

    return
  }

  try {
    const { data: recipe } = await $fetch<{ data: IRecipe }>('/api/recipes', {
      method: 'POST',
      body: {
        ...state.data,
      },
    })

    if (formCreateRecipe.value.image) {
      await supabase.storage
        .from(BucketStorage.RECIPE_IMAGE)
        .upload(
          `${user.value?.id}/${recipe.id}`,
          formCreateRecipe.value.image,
          {
            cacheControl: '3600',
            upsert: true,
          }
        )
    }

    toast.add({
      title: 'Succès',
      description: 'Votre recette est prête à être cuisinée',
      color: 'success',
    })

    navigateTo('/')
  } catch {
    toast.add({
      title: 'Echec',
      description: "Impossible d'ajouter votre recette, veuillez réassayer",
      color: 'error',
    })
  }
}
</script>

<template>
  <LazyRecipesCreate v-model:form="formCreateRecipe" @submit="onSubmit" />
</template>
