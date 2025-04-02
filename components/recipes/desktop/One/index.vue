<script setup lang="ts">
import type { TRecipeWithIngredientSteps } from '~/server/api/recipes/type'

const route = useRoute()

const recipe = ref<TRecipeWithIngredientSteps>()

const getRecipe = async () => {
  try {
    recipe.value = await $fetch<TRecipeWithIngredientSteps>(`/api/recipes/${route.params.id}`)
  } catch (err) {
    throw createError(err)
  }
}

onMounted(getRecipe)
</script>
<template>
  <div v-if="recipe" class="flex flex-col gap-6">
    <div class="flex justify-between">
      <div class="text-3xl font-bold">{{ recipe.name }}</div>
      <Button variant="outline">modifier</Button>
    </div>

    <img
      class="rounded-lg border p-1"
src="https://plus.unsplash.com/premium_photo-1661610605309-77feabcc8772?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFkJTIwdGhhaXxlbnwwfHwwfHx8MA%3D%3D"
>

    <div>{{ recipe.description }}</div>
    
    <div class="border rounded-lg bg-secondary p-4">
      <div class="grid grid-cols-2">
        <template v-for="ingredient in recipe.ingredients" :key="ingredient.id">
          <div>{{ ingredient.name }}</div>
          <div>{{ ingredient.quantity }} {{ ingredient.unit }}</div>
        </template>
      </div>
    </div>

    <div v-for="({ step }, index) in recipe.steps" :key="index">
      <div class="font-semibold text-gray-500">Étape {{ index + 1 }}</div>
      <div>{{ step }}</div>
    </div>
  </div>
</template>