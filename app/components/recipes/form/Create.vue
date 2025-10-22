<script lang="ts" setup>
import type {
  IIngredientQuatityForm,
  TRecipeFormCreate,
} from '~/utils/types/recipes'

const form = defineModel<TRecipeFormCreate>('form', { required: true })

const emit = defineEmits<{
  submit: []
}>()

const { isMobile } = useDevice()

const handleAddNewIngredient = (newIngredient: IIngredientQuatityForm) => {
  form.value.ingredients.push(newIngredient)
}

const handleDeleteIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1)
}

const handleAddNewStep = (newStep: string) => {
  form.value.steps.push({ step: newStep })
}

const handleDeleteStep = (index: number) => {
  form.value.steps.splice(index, 1)
}

const handleSubmit = (): void => emit('submit')
const handleCancel = (): void => {
  navigateTo('/recipes')
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <PageHeader :title="form.name ?? 'Nouvelle recette'">
      <UButton v-if="!isMobile" @click="handleSubmit">Terminer</UButton>
    </PageHeader>

    <RecipesFormCardDetails v-model:form="form" />
    <RecipesFormCardIngredients
      :ingredients="form.ingredients"
      @add-ingredient="handleAddNewIngredient"
      @delete-ingredient="handleDeleteIngredient"
    />
    <RecipesFormCardSteps
      :steps="form.steps"
      @add-step="handleAddNewStep"
      @delete-step="handleDeleteStep"
    />

    <UButton v-if="isMobile" block @click="handleSubmit">Terminer</UButton>
  </div>
</template>
