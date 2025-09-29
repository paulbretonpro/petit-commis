<script setup lang="ts">
import type { ICategory } from '~~/server/api/categories/type'

const { filters, loading } = storeToRefs(useRecipesStore())
const { handleResetFilter } = useRecipesStore()

const { data: categories, pending: pendingCategories } = useFetch<ICategory[]>(
  '/api/categories',
  {
    key: 'categories',
    server: false,
    default: () => [],
  }
)

const nbSelectedFilters = computed(
  () => Object.entries(filters.value).filter(([_, filter]) => !!filter).length
)
</script>

<template>
  <UDrawer>
    <div class="self-end fixed bottom-8 right-8">
      <UChip v-if="nbSelectedFilters" :text="nbSelectedFilters" size="3xl">
        <UButton
          color="primary"
          class="w-fit rounded-full shadow-lg"
          :loading
          icon="material-symbols:filter-list-rounded"
          size="xl"
        />
      </UChip>

      <UButton
        v-else
        color="primary"
        class="w-fit rounded-full shadow-lg"
        :loading
        icon="material-symbols:filter-list-rounded"
        size="xl"
      />
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
            :loading="pendingCategories"
            placeholder="Ex : Plat"
            class="w-full"
            label-key="name"
            value-key="id"
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
    </template>
  </UDrawer>
</template>
