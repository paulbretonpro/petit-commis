import { useDebounceFn } from '@vueuse/core'
import type {
  IIngredientQuatityForm,
  TRecipeFormCreate,
} from '~/utils/types/recipes'

export default function (form: Ref<TRecipeFormCreate>) {
  const route = useRoute()
  const toast = useToast()
  const user = useSupabaseUser()

  const { clearCache } = useRecipesStore()
  const { resetCacheKey } = useRecipeImageStore()

  const handleAddNewIngredient = async (ingredient: IIngredientQuatityForm) => {
    form.value.ingredients.push(ingredient)

    try {
      await $fetch(`/api/recipes/${route.params.id}/ingredients`, {
        method: 'POST',
        body: {
          ingredientId: ingredient.ingredient?.id,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        },
      })

      clearNuxtData(`recipe-${route.params.id}`)
    } catch {
      toast.add({
        title: "Erreur d'ajout d'ingrédient",
        description:
          "Une erreur est survenue lors de l'ajout de l'ingrédient à la recette.",
        color: 'error',
      })

      form.value.ingredients.pop()
    }
  }

  const handleDeleteIngredient = async (index: number) => {
    const deletedIngredient = form.value.ingredients[index]
    form.value.ingredients.splice(index, 1)

    try {
      await $fetch(
        `/api/recipes/${route.params.id}/ingredients/${deletedIngredient?.ingredient?.id}`,
        {
          method: 'DELETE',
        }
      )

      clearNuxtData(`recipe-${route.params.id}`)
    } catch {
      toast.add({
        title: "Erreur de suppression d'ingrédient",
        description:
          "Une erreur est survenue lors de la suppression de l'ingrédient de la recette.",
        color: 'error',
      })

      if (deletedIngredient) {
        form.value.ingredients.splice(index, 0, deletedIngredient)
      }
    }
  }

  const handleAddNewStep = async (step: string) => {
    form.value.steps.push({ step })

    try {
      const { data } = await $fetch<{ data: { id: number } }>(
        `/api/recipes/${route.params.id}/steps`,
        {
          method: 'POST',
          body: {
            step,
          },
        }
      )

      form.value.steps[form.value.steps.length - 1].id = data.id

      clearNuxtData(`recipe-${route.params.id}`)
    } catch {
      toast.add({
        title: "Erreur d'ajout d'étape",
        description:
          "Une erreur est survenue lors de l'ajout de l'étape à la recette.",
        color: 'error',
      })

      form.value.steps.pop()
    }
  }

  const handleDeleteStep = async (index: number) => {
    const deletedStep = form.value.steps[index]

    form.value.steps.splice(index, 1)
    try {
      await $fetch(`/api/recipes/${route.params.id}/steps/${deletedStep?.id}`, {
        method: 'DELETE',
      })

      clearNuxtData(`recipe-${route.params.id}`)
    } catch {
      toast.add({
        title: "Erreur de suppression d'étape",
        description:
          "Une erreur est survenue lors de la suppression de l'étape de la recette.",
        color: 'error',
      })

      if (deletedStep) {
        form.value.steps.splice(index, 0, deletedStep)
      }
    }
  }

  const handleUpdateDetails = useDebounceFn(async () => {
    const { name, description, nbPersons, category } = form.value

    try {
      await $fetch(`/api/recipes/${route.params.id}`, {
        method: 'PUT',
        body: {
          name,
          description,
          nbPersons,
          category,
        },
      })

      clearNuxtData(`recipe-${route.params.id}`)
      clearCache()
    } catch {
      toast.add({
        title: 'Erreur de mise à jour des détails',
        description:
          'Une erreur est survenue lors de la mise à jour des détails de la recette.',
        color: 'error',
      })
    }
  }, 800)

  const handleDeleteImage = async () => {
    await $fetch(`/api/recipes/${route.params.id}/image`, {
      method: 'DELETE',
    })

    clearNuxtData(`recipe-${route.params.id}`)
    resetCacheKey(`${user.value?.id}-${route.params.id}`)
  }

  watch(
    () => form.value.image,
    async (newImage) => {
      if (newImage) {
        const formData = new FormData()
        formData.append('image', newImage)

        await $fetch(`/api/recipes/${route.params.id}/image`, {
          method: 'POST',
          body: formData,
        })
      }

      clearNuxtData(`recipe-${route.params.id}`)

      resetCacheKey(`${user.value?.id}-${route.params.id}`)
    }
  )

  return {
    handleAddNewIngredient,
    handleAddNewStep,
    handleDeleteImage,
    handleDeleteIngredient,
    handleDeleteStep,
    handleUpdateDetails,
  }
}
