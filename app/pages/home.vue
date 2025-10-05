<script setup lang="ts">
const { filters } = storeToRefs(useRecipesStore())

const { categories, loading: loadingCategories } = useCategories()
const { favoriteRecipes, loading: loadingRecipes } = useFavoriteRecipes()
</script>

<template>
  <div class="flex flex-col gap-12">
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
        />
      </template>
    </UInput>

    <HomeSectionRecipes :recipes="favoriteRecipes" :loading="loadingRecipes" />
    <HomeSectionCatogries :categories :loading="loadingCategories" />
  </div>
</template>
