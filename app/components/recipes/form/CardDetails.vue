<script setup lang="ts">
import type { TRecipeFormCreate } from '~/utils/types/recipes'

const DEFAULT_RECIPE_NB_PERSON = 2

const form = defineModel<TRecipeFormCreate>('form', { required: true })

const emit = defineEmits<{
  change: [void]
}>()
const { categories } = useCategories()

watch(
  [
    () => form.value.name,
    () => form.value.category,
    () => form.value.nbPersons,
    () => form.value.description,
  ],
  () => emit('change')
)
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6">
    <UFileUpload accept="image/*" class="grow" />

    <UCard class="grow">
      <template #header>Informations générales</template>
      <template #default>
        <div class="flex flex-col gap-4">
          <UInput v-model="form.name" placeholder="Nom de la recette" />
          <USelectMenu
            v-model="form.category"
            placeholder="Catégorie"
            :items="categories"
            value-key="id"
            label-key="name"
          />
          <UInputNumber
            v-model="form.nbPersons"
            :default-value="DEFAULT_RECIPE_NB_PERSON"
            :min="1"
            :max="100"
          />
          <UTextarea
            v-model="form.description"
            placeholder="Une note à ajouter ?"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>
