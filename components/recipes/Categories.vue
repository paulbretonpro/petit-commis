<script setup lang="ts">
import type { ICategory } from '~/server/api/categories/type'

const categorySelected = defineModel<number | undefined>()

const { data: categories, status } = await useFetch<ICategory[]>('/api/categories', {
  key: 'categories'
})

const pending = computed(() => status.value === 'pending')
</script>
<template>
    <div v-if="pending">{{ status }}</div>
    <div v-else class="flex flex-col gap-2">
    <Label>Catégorie</Label>
    <Select v-model="categorySelected">
      <SelectTrigger>
        <SelectValue placeholder="Ex: petit-déjeuner" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>