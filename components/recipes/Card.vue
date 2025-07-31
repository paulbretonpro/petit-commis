<script lang="ts" setup>
import type { IRecipe } from '~/server/api/recipes/type'

const props = defineProps<{
  recipe: IRecipe
}>()

const { getImage } = useRecipe()

const imageUrl = computed(
  () => props.recipe.hasImage && getImage(props.recipe.id)
)
</script>

<template>
  <UCard :ui="{ body: '!p-0 h-52' }">
    <template #default>
      <img v-if="imageUrl" :src="imageUrl" class="object-cover h-full w-full" />

      <div v-else class="flex items-center justify-center h-full">
        <UIcon :name="ICON_RECIPE_WITHOUT_IMAGE" class="w-10 h-10" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <div class="font-semibold truncate">{{ recipe.name }}</div>
        <ButtonAddToPlanning
          :recipe-id="recipe.id"
          without-label
          class="w-fit"
        />
      </div>
    </template>
  </UCard>
</template>
