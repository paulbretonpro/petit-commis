<script setup lang="ts">
const { filters, loading } = storeToRefs(useRecipesStore())
const { handleResetFilter } = useRecipesStore()

const { categories } = useCategories()
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
          :search-input="false"
          placeholder="Ex : Plat"
          label-key="name"
          value-key="id"
          class="w-full"
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
