<script setup lang="ts">
import type { TRecipeWithIngredientSteps } from '~/server/api/recipes/type'

defineProps<{
  imageUrl: string | undefined
  recipe: TRecipeWithIngredientSteps
}>()
</script>

<template>
  <div class="flex flex-col gap-6">
    <PageHeader :title="recipe.name">
      <UButton>Modifier</UButton>
    </PageHeader>

    <div class="flex gap-4">
      <UBadge :label="recipe.category?.name" />
      <UBadge :label="recipe.nbPersons" icon="material-symbols:fork-spoon" />
    </div>

    <div class="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:h-96">
      <div class="border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden h-full">
        <img  v-if="recipe.hasImage" :src="imageUrl" class="w-full h-full object-cover">
        <div v-else class="flex items-center justify-center h-full">
          <UIcon :name="ICON_RECIPE_WITHOUT_IMAGE" class="w-10 h-10" />
        </div>
      </div>
      
      <UCard :ui="{ root: 'flex flex-col', body: 'flex-1 overflow-y-auto' }">
        <template #header>Ingrédients</template>
        <template #default>
          <div v-if="recipe.ingredients.length" class="flex flex-col gap-4">
            <div v-for="ingredient in recipe.ingredients" :key="ingredient.id" class="flex items-center gap-2">
              <UButton icon="fa6-solid:carrot" variant="outline" />
              <div>{{ ingredient.quantity }}{{ ingredient.unit }} {{ ingredient.name }}</div>
            </div>
          </div>

          <div v-else class="text-gray-500 text-sm font-medium text-center">Aucun ingrédient</div>
        </template>
      </UCard>
    </div>

    <UCard>
      <template #header>Étapes</template>
      <template #default>
        <div v-if="recipe.steps.length" class="flex flex-col gap-6">
          <div v-for="(step, index) in recipe.steps" :key="index" class="flex flex-col gap-2 grow">
            <UBadge variant="subtle" :label="`Etape ${index + 1}`" class="h-fit w-fit" />
            <div class="text-gray-500">{{ step.step }}</div>
          </div>
        </div>

        <div v-else class="text-gray-500 text-sm font-medium text-center">Aucune étape</div>
      </template>
    </UCard>
  </div>
</template>