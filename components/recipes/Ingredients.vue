<script setup lang="ts">
import type { IIngredient } from '~/server/api/ingredients/type'
import Badge from '../ui/badge/Badge.vue'

const ingredientIds = defineModel<number[] | undefined>({ required: true })

const { data } = await useFetch<IIngredient[]>('/api/ingredients', {
  key: 'ingredients'
})

const ingredientsBadges = computed(() => data.value?.filter((ingredient) => ingredientIds.value?.includes(ingredient.id)))

const handleDeleteIngredients = (badgeId: number) => {
  const index = ingredientIds.value?.findIndex(id => id === badgeId) ?? -1
  if (index >= 0) {
    ingredientIds.value?.splice(index, 1)
  }
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <Label>Ingrédients</Label>
    <Select v-model="ingredientIds" multiple>
      <SelectTrigger>
        <SelectValue placeholder="Ex: beurre" />
        <SelectContent>
          <SelectItem v-if="!data?.length" disabled value="null">
            Aucun ingrédient
          </SelectItem>

          <SelectItem v-for="ingredient in data" :key="ingredient.id" :value="ingredient.id" class="capitalize">
          {{ ingredient.name }}
        </SelectItem>
          
        </SelectContent>
      </SelectTrigger>
    </Select>
    <div class="flex flex-wrap gap-2">
      <Badge v-for="badge in ingredientsBadges" :key="badge.id" class="capitalize" edit @click="handleDeleteIngredients(badge.id)">{{ badge.name }}</Badge>
    </div>
  </div>
</template>