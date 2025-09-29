<script setup lang="ts">
import type { TRecipeWithIngredientSteps } from '~~/server/api/recipes/type'
import { BucketStorage } from '~~/shared/types/database-type'

const supabase = useSupabaseClient()
const route = useRoute()
const user = useSupabaseUser()

const imageUrl = ref<string>()

const { data: recipe } = useLazyAsyncData<TRecipeWithIngredientSteps>(
  `recipe-${route.params.id}`,
  async () => {
    const recipe = await $fetch<TRecipeWithIngredientSteps>(
      `/api/recipes/${route.params.id}`
    )
    const { data } = supabase.storage
      .from(BucketStorage.RECIPE_IMAGE)
      .getPublicUrl(`${user.value?.id}/${recipe.id}`)

    imageUrl.value = data.publicUrl

    return recipe
  },
  { server: false }
)
</script>

<template>
  <LazyRecipesById v-if="recipe" :recipe :image-url />
  <LazyRecipesByIdSkeleton v-else />
</template>
