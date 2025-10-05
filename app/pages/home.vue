<script setup lang="ts">
const { filters } = storeToRefs(useRecipesStore())

const { categories, loading: loadingCategories } = useCategories()
const { favoriteRecipes, loading: loadingRecipes } = useFavoriteRecipes()
const { fetchRecipes, recipes } = useSearchRecipes()

const displayRecipes = computed(() => filters.value.search)

watch(
  () => filters.value.search,
  () => {
    if (!filters.value.search) {
      recipes.value = []
      return
    }

    if (filters.value.search.length < 3) {
      recipes.value = []
    } else {
      fetchRecipes()
    }
  }
)
</script>

<template>
  <div v-auto-animate class="flex flex-col gap-12">
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

    <div v-if="displayRecipes" class="space-y-4">
      <HomeRecipesSmallCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe
      />

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
