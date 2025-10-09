<script setup lang="ts">
const { filters } = storeToRefs(useRecipesStore())

const { categories, loading: loadingCategories } = useCategories()
const { favoriteRecipes, loading: loadingRecipes } = useFavoriteRecipes()
const { fetchDebounceRecipes, recipes, loading } = useSearchRecipes()

const displayRecipes = computed(() => filters.value.search)

const handleFetchRecipes = async (search: string) => {
  filters.value.search = search

  fetchDebounceRecipes()
}
</script>

<template>
  <div v-auto-animate class="flex flex-col gap-12">
    <UInput
      :model-value="filters.search"
      placeholder="Rechercher une recette"
      icon="material-symbols:search-rounded"
      size="xl"
      @update:model-value="handleFetchRecipes"
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

    <div v-if="displayRecipes" v-auto-animate class="space-y-4">
      <LazySharedSpinner v-if="loading" class="mx-auto" />
      <template v-else>
        <HomeRecipesSmallCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe
        />
      </template>

      <NuxtLink to="/recipes">
        <div
          class="text-primary font-medium flex items-center justify-center gap-2 pt-4"
        >
          <div>Voir plus</div>
          <UIcon name="material-symbols:arrow-right-alt-rounded" />
        </div>
      </NuxtLink>
    </div>

    <template v-else>
      <HomeSectionRecipes
        :recipes="favoriteRecipes"
        :loading="loadingRecipes"
      />
      <HomeSectionCatogries :categories :loading="loadingCategories" />
    </template>
  </div>
</template>
