<script setup lang="ts">
import type { ICategory } from '~~/server/api/categories/type'

const { filters, loading } = storeToRefs(useRecipesStore())
const { handleResetFilter } = useRecipesStore()

const { data: categories, pending: pendingCategories } = useFetch<ICategory[]>(
  '/api/categories',
  {
    key: 'categories',
    default: () => [],
    server: false,
  }
)
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between h-8">
        <div>Filtres</div>

        <UButton
          v-if="loading"
          :loading
          outline
          label="Chargement ..."
          variant="ghost"
          color="neutral"
        />
      </div>
    </template>

    <div class="space-y-4">
      <UFormField label="Nom" help="3 caractères minimum">
        <UInput v-model="filters.search" placeholder="Ex : Sushis">
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

      <UButton
        label="Réinitialiser"
        variant="outline"
        color="neutral"
        block
        @click="handleResetFilter"
      />
    </div>
  </UCard>
</template>
