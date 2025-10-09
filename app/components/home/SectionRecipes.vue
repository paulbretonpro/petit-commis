<script setup lang="ts">
import type { IRecipe } from '~~/server/api/recipes/type'

defineProps<{
  recipes: Partial<IRecipe>[]
  loading: boolean
}>()

const emit = defineEmits(['open-recipe'])
</script>

<template>
  <div class="space-y-4">
    <div class="text-xl font-semibold">Recettes favorites</div>

    <div v-if="loading" class="flex gap-6 overflow-hidden">
      <SharedCardRecipeSkeleton
        v-for="index in 5"
        :key="index"
        class="min-w-72 snap-center"
      />
    </div>

    <template v-else>
      <div
        v-if="recipes.length === 0"
        class="text-sm font-medium text-gray-500"
      >
        Aucune recette favorite
      </div>

      <UCarousel
        v-else
        v-slot="{ item }"
        :items="recipes"
        :ui="{
          item: 'basis-1/2 sm:basis-1/3 md:basis-1/4',
          container: 'gap-6',
        }"
      >
        <NuxtLink :custom="item.id === 0" :to="`/recipes/${item.id}`">
          <SharedCardRecipe
            :recipe="item"
            without-link
            @click="emit('open-recipe')"
          />
        </NuxtLink>
      </UCarousel>
    </template>
  </div>
</template>
