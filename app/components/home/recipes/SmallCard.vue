<script setup lang="ts">
import type { IRecipe } from '~~/server/api/recipes/type'

defineProps<{ recipe: IRecipe }>()
</script>

<template>
  <div class="flex rounded-lg h-20 shadow overflow-hidden cursor-pointer">
    <img src="https://picsum.photos/468/468?random=1" />
    <div class="w-full overflow-hidden font-medium p-4 flex-col gap-1">
      <div class="truncate">{{ recipe.name }}</div>
      <div class="flex justify-between">
        <div class="text-secondary font-medium">
          {{ recipe.category?.name }}
        </div>
        <UBadge icon="material-symbols:fork-spoon" variant="soft">
          x{{ recipe.nbPersons }}
        </UBadge>
      </div>
    </div>
  </div>
</template>
