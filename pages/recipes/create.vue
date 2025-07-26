<script lang="ts" setup>
import type { ICategory } from '~/server/api/categories/type'
import type { IIngredient } from '~/server/api/ingredients/type'

const DEFAULT_RECIPE_NB_PERSON = 2
const UNITS = [
  'g',
  'kg',
  'c.a.s',
  'c.a.c',
  'l',
  'ml',
  'cl',
  'sachet',
]

const { data: categories, pending: pendingCategories } = await useFetch<ICategory[]>('/api/categories', {
  key: 'categories',
  default: () => []
})
const { data: ingredients, pending: pendingIngredients } = useAsyncData<IIngredient[]>('ingredients', async () => $fetch('/api/ingredients'), { server: false, default: () => [] })
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <div class="text-2xl font-semibold">Nouvelle recette</div>

      <div class="flex gap-2">
        <UButton size="xl" variant="outline" >Annuler</UButton>
        <UButton size="xl">Terminer</UButton>
      </div>
    </div>

    <div class="flex gap-6">
      <UFileUpload class="grow" />
      <UCard class="grow" variant="outline">
        <template #header>Informations générales</template>
        <div class="flex flex-col gap-4">
          <UInput placeholder="Nom de la recette" />
          <USelect placeholder="Catégorie" :items="categories" :loading="pendingCategories" label-key="name" />
          <UInputNumber :default-value="DEFAULT_RECIPE_NB_PERSON" :min="0" :max="100" />
          <UTextarea placeholder="Une note à ajouter ?" />
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header>Ingrédients</template>
      <template #default>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-3 gap-4">
            <USelectMenu placeholder="Ingrédient" :items="ingredients" :loading="pendingIngredients" label-key="name" search-input />
            <UInputNumber placeholder="Quantité" />
            <USelect placeholder="Unité" :items="UNITS" />
          </div>
          <div class="flex gap-2 flex-wrap">
            <UBadge class="cursor-pointer" label="2 carottes" trailing-icon="fa6-solid:xmark" />
            <UBadge class="cursor-pointer" label="3kg poireaux" trailing-icon="fa6-solid:xmark" />
          </div>
        </div>
      </template>
    </UCard>

    <UCard>
      <template #header>Étapes</template>
      <template #default>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <UBadge variant="subtle" label="Etape 1" class="h-fit" />
            <div class="text-gray-500">Signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</div>
          </div>

          <UButton size="sm" icon="fa6-solid:plus" class="w-fit mx-auto">Ajouter une étape</UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>