<script setup lang="ts">
import type { TRecipeWithIngredientSteps } from '~/server/api/recipes/type'

const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const recipe = ref<TRecipeWithIngredientSteps>()
const imageUrl = ref<string>()

const getRecipe = async () => {
  try {
    recipe.value = await $fetch<TRecipeWithIngredientSteps>(`/api/recipes/${route.params.id}`)
    const { data } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(`${user.value?.id}/pate`)
    
    imageUrl.value = data.publicUrl
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

    <div class="grid grid-cols-2">
      <img class="rounded-lg border p-1" :src="imageUrl" >
      <div class="border rounded-lg bg-secondary p-4 h-fit">
        <div class="grid grid-cols-2">
          <template v-for="ingredient in recipe.ingredients" :key="ingredient.id">
            <div>{{ ingredient.name }}</div>
            <div>{{ ingredient.quantity }} {{ ingredient.unit }}</div>
          </template>
        </div>
      </div>
    </div>
    

    <div>{{ recipe.description }}</div>

    <div v-for="({ step }, index) in recipe.steps" :key="index">
      <div class="font-semibold text-gray-500">Étape {{ index + 1 }}</div>
      <div>{{ step }}</div>
    </div>
  </div>
</template>