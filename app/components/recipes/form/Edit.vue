<script lang="ts" setup>
import type { TRecipeFormCreate } from '~/utils/types/recipes'

const form = defineModel<TRecipeFormCreate>('form', { required: true })

const route = useRoute()

const { handleDeleteImage, handleUpdateDetails, handleUpdateContent } =
  useRecipeEdit(form)

const { getImage, imageUrl, handleResetCacheKey } = useRecipeImage()

const handleRemoveImage = async () => {
  await handleDeleteImage()
  handleResetCacheKey(route.params.id as string)
}

onMounted(() => {
  if (route.params.id) {
    const { data } = useNuxtData(`recipe-${route.params.id}`)

    if (data.value?.hasImage) {
      getImage(route.params.id as string)
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <PageHeader :title="form.name ?? 'Nouvelle recette'" />

    <RecipesFormCardDetails v-model:form="form" @change="handleUpdateDetails">
      <template v-if="imageUrl" #image-upload>
        <div class="relative">
          <div class="w-[400px] h-[320px] overflow-hidden">
            <img
              :src="imageUrl"
              alt="Image de la recette"
              class="rounded-md object-cover w-full h-full"
            />

            <div class="absolute -top-2 -right-2">
              <UButton
                size="xs"
                color="neutral"
                variant="solid"
                class="rounded-full"
                icon="i-lucide:x"
                @click="handleRemoveImage"
              />
            </div>
          </div>
        </div>
      </template>
    </RecipesFormCardDetails>

    <RecipesFormCardEditor v-model:form="form" />
  </div>
</template>
