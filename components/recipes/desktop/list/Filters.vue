<script setup lang="ts">
import type { ICategory } from '~/server/api/categories/type'

const { filters } = storeToRefs(useRecipesStore())

const { data: categories, pending: pendingCategories } = await useFetch<ICategory[]>('/api/categories', {
  key: 'categories',
  default: () => []
})

const handleResetFilter = () => {
  filters.value.categoryId = undefined
  filters.value.search = undefined
}
</script>

<template>
  <UCard :ui="{ root: 'w-64' }">
    <template #header>Filtres</template>

    <div class="space-y-4">
      <UFormField label="Nom">
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
        <USelectMenu v-model="filters.categoryId" :items="categories" :loading="pendingCategories" placeholder="Ex : Plat" class="w-full" label-key="name" value-key="id" />
      </UFormField>

      <UButton label="Réinitialiser" variant="outline" color="neutral" block @click="handleResetFilter" />
    </div>
  </UCard>
</template>