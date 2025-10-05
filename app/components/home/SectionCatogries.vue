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

    <div v-else class="flex flex-wrap gap-8">
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex rounded-lg h-20 shadow overflow-hidden cursor-pointer"
        @click="emit('open-category')"
      >
        <img src="https://picsum.photos/468/468?random=1" />
        <div
          class="w-40 font-medium truncate px-6 py-4 flex items-center bg-elevated/50"
        >
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>
