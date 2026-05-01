<script setup lang="ts">
import type { TRecipeWithIngredientSteps } from '~~/server/api/recipes/type'

const props = defineProps<{
  recipe: TRecipeWithIngredientSteps
}>()

const { isMobile } = useDevice()

const { getImage, imageUrl } = useRecipeImage()

if (props.recipe.hasImage) {
  getImage(props.recipe.id)
}

const { data: markdown } = await useAsyncData('markdown', () =>
  parseMarkdown(props.recipe.content ?? '')
)
</script>

<template>
  <div class="flex flex-col gap-6">
    <PageHeader :title="recipe.name">
      <div class="flex gap-4">
        <ButtonAddToPlanning without-label :recipe-id="recipe.id" />
        <NuxtLink :to="`/recipes/${recipe.id}/edit`">
          <UButton
            icon="material-symbols:ink-pen"
            :label="isMobile ? undefined : 'Modifier'"
          />
        </NuxtLink>
      </div>
    </PageHeader>

    <div class="flex gap-4">
      <UBadge :label="recipe.category?.name" />
      <UBadge :label="recipe.nbPersons" icon="material-symbols:fork-spoon" />
    </div>

    <div class="flex flex-col sm:grid sm:grid-cols-2 gap-6 items-start">
      <div
        class="md:sticky md:top-24 border border-gray-200 dark:border-neutral-800 rounded-lg max-h-96 w-full"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="w-full h-full object-cover rounded-lg"
        />
        <div v-else class="flex items-center justify-center h-96">
          <UIcon :name="ICON_RECIPE_WITHOUT_IMAGE" class="w-10 h-10" />
        </div>
      </div>

      <MDCRenderer
        v-if="markdown"
        :body="markdown.body"
        :data="markdown.data"
      />
    </div>
  </div>
</template>
