<script setup lang="ts">
import type { TRecipeWithIngredientSteps } from '~/server/api/recipes/type'
import { BucketStorage } from '~/server/type'

const supabase = useSupabaseClient()
const route = useRoute()
const user = useSupabaseUser()

const imageUrl = ref<string>()

const { data: recipe } = useAsyncData<TRecipeWithIngredientSteps>(`recipe-${route.params.id}`, async () => {
  const recipe = await $fetch<TRecipeWithIngredientSteps>(`/api/recipes/${route.params.id}`)

  const { data } = supabase
    .storage
    .from(BucketStorage.RECIPE_IMAGE)
    .getPublicUrl(`${user.value?.id}/${recipe.id}`)
  
  imageUrl.value = data.publicUrl

  return recipe
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <div class="text-2xl font-semibold">{{ recipe?.name }}</div>
      <UButton>Modifier</UButton>
    </div>

    <div class="flex gap-6">
      <div class="flex-1 overflow-hidden">
        <NuxtImg :src="imageUrl" class="rounded-md" />
      </div>
      <UCard class="flex-1">
        <div>Catégorie : {{ recipe?.category?.name }}</div>
        <div>Nombre de personne : {{ recipe?.nbPersons }}</div>
        <div>Note : {{ recipe?.description }}</div>
      </UCard>
    </div>

    <UCard>
      <template #header>Ingrédients</template>
      <template #default>
        <div v-if="recipe?.ingredients.length" class="flex flex-col gap-2">
          <ul class="flex flex-col gap-4">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id" class="flex items-center gap-2">
              <UButton icon="fa6-solid:carrot" variant="outline" />
              <div>{{ ingredient.name }} {{ ingredient.quantity }} {{ ingredient.unit }}</div>
            </li>
          </ul>
        </div>
        <div v-else class="text-gray-500 text-sm font-medium text-center">Aucun ingrédient</div>
      </template>
    </UCard>

    <UCard>
      <template #header>Étapes</template>
      <template #default>
        <div v-if="recipe?.steps.length" class="flex flex-col gap-6">
          <div v-for="(step, index) in recipe?.steps" :key="index" class="flex flex-col gap-2 grow">
            <UBadge variant="subtle" :label="`Etape ${index + 1}`" class="h-fit w-fit" />
            <div class="text-gray-500">{{ step.step }}</div>
          </div>
        </div>

        <div v-else class="text-gray-500 text-sm font-medium text-center">Aucune étape</div>
      </template>
    </UCard>
  </div>
</template>