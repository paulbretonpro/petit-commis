<script setup lang="ts">
import type { IRecipe } from '~~/server/api/recipes/type'

defineProps<{
  recipes: IRecipe[]
}>()

const emit = defineEmits(['open-recipe'])
</script>

<template>
  <div class="space-y-4">
    <div class="text-xl font-semibold">Recettes favorites</div>

    <UCarousel
      v-slot="{ item }"
      :items="recipes"
      :ui="{ item: 'basis-1/2 sm:basis-1/3 md:basis-1/4' }"
    >
      <SharedCardRecipe :recipe="item" @click="emit('open-recipe')" />
    </UCarousel>
  </div>
</template>
