<script lang="ts" setup>
import type { IRecipe } from '~/server/api/recipes/type'

const props = defineProps<{
  recipe: IRecipe
}>()

const { getImage } = useRecipe()

const imageUrl = computed(() => props.recipe.hasImage && getImage(props.recipe.id))  
</script>

<template>
  <UCard variant="subtle" :ui="{ body: '!p-0 h-52' }">
    <template #header>
      {{ recipe.name }}
    </template>
    <template #default>
      <img v-if="imageUrl" :src="imageUrl" class="object-cover h-full w-full">

      <div v-else class="flex items-center justify-center h-full">
        <UIcon :name="ICON_RECIPE_WITHOUT_IMAGE" class="w-10 h-10" />
      </div>
    </template>
  </UCard>
</template>