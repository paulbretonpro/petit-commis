<script setup lang="ts">
import type { IRecipe } from '~~/server/api/recipes/type'

defineProps<{
  recipe: IRecipe
}>()

const user = useSupabaseUser()
</script>

<template>
  <NuxtLink :to="`/recipes/${recipe.id}`">
    <div class="rounded-xl shadow dark:shadow-xl overflow-hidden">
      <div class="relative">
        <img src="https://picsum.photos/468/468?random=6" />
        <UBadge
          variant="solid"
          color="primary"
          icon="material-symbols:fork-spoon"
          class="absolute bottom-3 left-4"
          >x{{ recipe.nbPersons }}</UBadge
        >
      </div>
      <div class="space-y-1 p-4">
        <div class="truncate font-medium text-highlighted">
          {{ recipe.name }}
        </div>

        <div class="flex items-center justify-between gap-2">
          <div class="text-secondary font-medium truncate">
            {{ recipe.category?.name }}
          </div>
          <LazyButtonAddToPlanning
            v-if="user"
            :recipe-id="recipe.id"
            without-label
            class="w-fit"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
