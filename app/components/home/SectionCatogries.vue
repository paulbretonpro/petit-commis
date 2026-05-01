<script setup lang="ts">
import type { ICategory } from '~~/server/api/categories/type'

defineProps<{
  categories: ICategory[]
  loading: boolean
}>()

const emit = defineEmits(['open-category'])
</script>

<template>
  <div class="space-y-4">
    <div class="text-xl font-semibold">Catégories</div>

    <LazyHomeCategoriesSkeleton v-if="loading" />

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap gap-6"
    >
      <UBadge
        v-for="category in categories"
        :key="category.id"
        variant="subtle"
        size="xl"
        :label="category.name"
        class="cursor-pointer"
        @click="$emit('open-category', category)"
      />
    </div>
  </div>
</template>
