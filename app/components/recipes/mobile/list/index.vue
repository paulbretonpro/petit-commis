<script setup lang="ts">
import type { IRecipe } from '~~/server/api/recipes/type'

defineProps<{
  loading: boolean
  recipes: IRecipe[]
}>()

const { filters } = storeToRefs(useRecipesStore())
</script>

<template>
  <PageHeader title="Recettes">
    <NuxtLink to="/recipes/create">
      <UButton
        label="Créer"
        color="neutral"
        variant="soft"
        icon="material-symbols:add-rounded"
      />
    </NuxtLink>
  </PageHeader>

  <RecipesListSkeleton v-if="loading" />
  <template v-else>
    <UInput
      v-model="filters.search"
      placeholder="Rechercher une recette"
      icon="material-symbols:search-rounded"
      size="xl"
    >
      <template v-if="filters.search?.length" #trailing>
        <UButton
          color="neutral"
          variant="link"
          icon="i-lucide-circle-x"
          aria-label="Clear input"
          @click="filters.search = undefined"
        /> </template
    ></UInput>

    <div class="grid grid-cols-2 gap-4">
      <template v-if="recipes.length">
        <NuxtLink
          v-for="recipe in recipes"
          :key="recipe.id"
          :to="`/recipes/${recipe.id}`"
        >
          <!-- <RecipesCard :recipe /> -->
          <SharedCardRecipe :recipe />
        </NuxtLink>
      </template>

      <div v-else class="col-span-2 text-center text-sm font-medium">
        Aucune recette
      </div>
    </div>
  </template>
</template>
