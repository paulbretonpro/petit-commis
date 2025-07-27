<script setup lang="ts">
import type { TRecipeWithIngredientSteps } from '~/server/api/recipes/type'
import { BucketStorage } from '~/server/type'

const supabase = useSupabaseClient()
const route = useRoute()
const user = useSupabaseUser()

const imageUrl = ref<string>()

const { data: recipe, pending } = useAsyncData<TRecipeWithIngredientSteps>(`recipe-${route.params.id}`, async () => {
  const recipe = await $fetch<TRecipeWithIngredientSteps>(`/api/recipes/${route.params.id}`)
  const { data } = supabase
    .storage
    .from(BucketStorage.RECIPE_IMAGE)
    .getPublicUrl(`${user.value?.id}/${recipe.id}`)
  
  imageUrl.value = data.publicUrl

  return recipe
}, { server: false })
</script>

<template>
  <LazyRecipesByIdSkeleton v-if="pending" />
  <div v-else>
    <LazyRecipesById v-if="recipe" :recipe :image-url />
    <div v-else>Pas de recette</div>
  </div>
</template>