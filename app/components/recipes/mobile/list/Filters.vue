<script setup lang="ts">
const { filters, loading } = storeToRefs(useRecipesStore())
const { handleResetFilter } = useRecipesStore()

const { categories } = useCategories()
const { fetchRecipes } = useSearchRecipes()

const open = ref(false)

const nbSelectedFilters = computed(
  () => Object.entries(filters.value).filter(([_, filter]) => !!filter).length
)

const handleApply = () => {
  open.value = false
  fetchRecipes()
}
</script>

<template>
  <UDrawer v-model:open="open">
    <div class="self-end fixed bottom-8 right-8">
      <UChip :show="nbSelectedFilters > 0" :text="nbSelectedFilters" size="3xl">
        <UButton
          block
          :loading
          color="primary"
          icon="material-symbols:filter-list-rounded"
          class="rounded-full shadow-lg h-16 w-16"
        />
      </UChip>
    </div>

    <template #body>
      <div class="space-y-4">
        <UFormField label="Nom" help="3 caractères minimum">
          <UInput
            v-model="filters.search"
            placeholder="Ex : Sushis"
            class="w-full"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-circle-x"
                aria-label="Clear input"
                @click="filters.search = undefined"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField label="Catégorie">
          <USelectMenu
            v-model="filters.categoryId"
            :items="categories"
            :search-input="false"
            placeholder="Ex : Plat"
            label-key="name"
            value-key="id"
            class="w-full"
          />
        </UFormField>
      </div>
    </template>

    <template #footer>
      <UButton
        label="Réinitialiser"
        :loading
        variant="outline"
        color="neutral"
        block
        @click="handleResetFilter"
      />

      <UButton label="Appliquer" block @click="handleApply" />
    </template>
  </UDrawer>
</template>
