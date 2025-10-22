<script setup lang="ts">
import type { IRecipe } from '~~/server/api/recipes/type'

const props = defineProps<{
  recipe: Partial<IRecipe>
  withoutLink?: boolean
}>()

const user = useSupabaseUser()

const { getImage, imageUrl } = useRecipeImage()

if (props.recipe.hasImage) {
  getImage(props.recipe.id!, {
    transform: {
      height: 300,
    },
  })
}
</script>

<template>
  <NuxtLink :custom="withoutLink" :to="`/recipes/${recipe.id}`">
    <div class="rounded-xl shadow dark:shadow-xl overflow-hidden">
      <div class="relative">
        <div v-if="imageUrl" class="w-full h-48 overflow-hidden">
          <img :src="imageUrl" class="h-full w-full object-cover" />
        </div>
        <div v-else class="flex items-center justify-center h-48">
          <UIcon
            :name="ICON_RECIPE_WITHOUT_IMAGE"
            class="w-16 h-16 text-gray-400"
          />
        </div>
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
            v-if="user && recipe.id"
            :recipe-id="recipe.id"
            without-label
            class="w-fit"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
