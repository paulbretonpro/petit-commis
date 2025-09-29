<script lang="ts" setup>
import type { ICategory } from '~~/server/api/categories/type'
import type { IIngredient } from '~~/server/api/ingredients/type'
import type {
  IIngredientQuatityForm,
  TRecipeFormCreate,
} from '~/utils/types/recipes'

const form = defineModel<TRecipeFormCreate>('form', { required: true })

const emit = defineEmits<{
  submit: []
}>()

const DEFAULT_RECIPE_NB_PERSON = 2
const UNITS = ['g', 'kg', 'c.a.s', 'c.a.c', 'l', 'ml', 'cl', 'sachet']
const DEFAULT_INGREDIENT_QUANTITY = {
  ingredient: undefined,
  quantity: undefined,
  unit: undefined,
}

const { isMobile } = useDevice()

const newStep = ref<string>()
const newIngredient = ref<IIngredientQuatityForm>({
  ...DEFAULT_INGREDIENT_QUANTITY,
})

const { data: categories, pending: pendingCategories } = await useFetch<
  ICategory[]
>('/api/categories', {
  key: 'categories',
  default: () => [],
})
const { data: ingredients, pending: pendingIngredients } = useAsyncData<
  IIngredient[]
>('ingredients', async () => $fetch('/api/ingredients'), {
  server: false,
  default: () => [],
})

const ingredientsFiltered = computed(() =>
  ingredients.value.filter(
    (ingredient) =>
      !form.value.ingredients
        .map((formIngredient) => formIngredient.ingredient?.id)
        .includes(ingredient.id)
  )
)

const handleAddNewIngredient = () => {
  if (newIngredient.value.ingredient?.id && newIngredient.value.quantity) {
    form.value.ingredients.push(newIngredient.value)
    // Reset du formulaire
    newIngredient.value = { ...DEFAULT_INGREDIENT_QUANTITY }
  }
}

const handleDeleteIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1)
}

const handleAddNewStep = () => {
  if (newStep.value?.trim().length) {
    form.value.steps.push(newStep.value)
    newStep.value = undefined
  }
}

const handleDeleteStep = (index: number) => {
  form.value.steps.splice(index, 1)
}

const handleSubmit = (): void => emit('submit')
const handleCancel = (): void => {
  navigateTo('/')
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <PageHeader :title="form.name ?? 'Nouvelle recette'">
      <div v-if="!isMobile" class="flex gap-2">
        <UButton size="xl" variant="outline" @click="handleCancel"
          >Annuler</UButton
        >
        <UButton size="xl" @click="handleSubmit">Terminer</UButton>
      </div>
    </PageHeader>

    <!-- Liste des informations -->
    <div class="flex flex-col md:flex-row gap-6">
      <UFileUpload v-model="form.image" accept="image/*" class="grow" />

      <UCard class="grow" variant="outline">
        <template #header>Informations générales</template>
        <template #default>
          <div class="flex flex-col gap-4">
            <UInput v-model="form.name" placeholder="Nom de la recette" />
            <USelectMenu
              v-model="form.category"
              placeholder="Catégorie"
              :items="categories"
              :loading="pendingCategories"
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

    <!-- Liste des ingrédients -->
    <UCard>
      <template #header>Ingrédients</template>
      <template #default>
        <div class="flex flex-col gap-4">
          <div class="grid md:grid-cols-[1fr_1fr_1fr_0.5fr] gap-4">
            <USelectMenu
              v-model="newIngredient.ingredient"
              placeholder="Ingrédient"
              :items="ingredientsFiltered"
              :loading="pendingIngredients"
              label-key="name"
              search-input
            />
            <UInputNumber
              v-model="newIngredient.quantity"
              placeholder="Quantité"
              :min="1"
            />
            <USelect
              v-model="newIngredient.unit"
              placeholder="Unité"
              :items="UNITS"
            />

            <UButton
              block
              variant="subtle"
              size="sm"
              icon="material-symbols:add-rounded"
              @click="handleAddNewIngredient"
              >Ajouter</UButton
            >
          </div>
          <div class="flex gap-2 flex-wrap">
            <UBadge
              v-for="(item, index) in form.ingredients"
              :key="item.ingredient?.id"
              :label="`${item.quantity} ${item.unit ?? ''} ${item.ingredient?.name}`"
              trailing-icon="fa6-solid:xmark"
              class="cursor-pointer"
              @click="handleDeleteIngredient(index)"
            />
          </div>
        </div>
      </template>
    </UCard>

    <!-- Liste des etapes -->
    <UCard>
      <template #header>Étapes</template>
      <template #default>
        <div class="flex flex-col gap-4">
          <div
            v-for="(step, index) in form.steps"
            :key="index"
            class="flex items-center gap-4"
          >
            <UIcon name="material-symbols:drag-indicator" />
            <div class="flex flex-col gap-2 grow">
              <UBadge
                variant="subtle"
                :label="`Etape ${index + 1}`"
                class="h-fit w-fit"
              />
              <div class="text-gray-500">{{ step }}</div>
            </div>
            <UButton
              icon="material-symbols:delete-outline-rounded"
              color="error"
              variant="subtle"
              @click="handleDeleteStep(index)"
            />
          </div>

          <div class="flex gap-2">
            <UBadge
              variant="subtle"
              :label="`Etape ${form.steps.length + 1}`"
              class="h-fit"
            />
            <UTextarea
              v-model="newStep"
              class="grow"
              @keydown.enter.prevent="handleAddNewStep"
            />
          </div>

          <UButton
            size="sm"
            variant="subtle"
            icon="material-symbols:add-rounded"
            class="w-fit mx-auto"
            @click="handleAddNewStep"
            >Ajouter une étape</UButton
          >
        </div>
      </template>
    </UCard>

    <div v-if="isMobile" class="grid grid-cols-2 gap-2">
      <UButton block variant="outline" @click="handleCancel">Annuler</UButton>
      <UButton block @click="handleSubmit">Terminer</UButton>
    </div>
  </div>
</template>
