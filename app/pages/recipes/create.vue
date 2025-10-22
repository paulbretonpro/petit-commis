<script setup lang="ts">
import { RecipeFormCreateSchema } from '~/utils/types/recipes'

const FIELD_NAME: Record<string, string> = {
  name: 'nom de la recette',
  category: 'catégorie',
}

const toast = useToast()
const recipesStore = useRecipesStore()
const fullScreenLoaderStore = useFullScreenLoader()

const { addRecipe, addPhoto, formCreateRecipe } = useRecipeCreate()

const onSubmit = async () => {
  const state = RecipeFormCreateSchema.safeParse({
    ...formCreateRecipe.value,
    ingredients: formCreateRecipe.value.ingredients.map((ingredient) => ({
      ...ingredient,
      ingredientId: ingredient.ingredient?.id,
    })),
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

    const recipe = await addRecipe(state.data)

    if (formCreateRecipe.value.image) {
      await addPhoto(recipe.id, formCreateRecipe.value.image)
    }

    toast.add({
      title: 'Succès',
      description: 'Votre recette est prête à être cuisinée',
      color: 'success',
    })

    recipesStore.clearCache()

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
</script>

<template>
  <LazyRecipesFormCreate v-model:form="formCreateRecipe" @submit="onSubmit" />
</template>
