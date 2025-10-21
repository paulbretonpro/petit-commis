<script setup lang="ts">
import type { IIngredientQuatityForm } from '~/utils/types/recipes'

const DEFAULT_INGREDIENT_QUANTITY = {
  ingredient: undefined,
  quantity: undefined,
  unit: undefined,
}

const props = defineProps<{
  ingredients: IIngredientQuatityForm[]
}>()

const emit = defineEmits<{
  'add-ingredient': [ingredient: IIngredientQuatityForm]
  'delete-ingredient': [index: number]
}>()

const { ingredients: allIngredients } = useIngredients()

const newIngredient = ref<IIngredientQuatityForm>({
  ...DEFAULT_INGREDIENT_QUANTITY,
})

const ingredientsFiltered = computed(() =>
  allIngredients.value.filter(
    (ingredient) =>
      !props.ingredients
        .map((formIngredient) => formIngredient.ingredient?.id)
        .includes(ingredient.id)
  )
)

const getIngredientLabel = (item: IIngredientQuatityForm): string => {
  const quantity = item.quantity ? `${item.quantity} ` : ''
  const unit = item.unit ? `${item.unit} ` : ''
  const name = item.ingredient?.name ?? ''
  return `${quantity}${unit} ${name}`
}

const handleAddNewIngredient = () => {
  if (newIngredient.value.ingredient?.id && newIngredient.value.quantity) {
    emit('add-ingredient', { ...newIngredient.value })
    // Reset du formulaire
    newIngredient.value.ingredient = undefined
    newIngredient.value.quantity = undefined
    newIngredient.value.unit = undefined
  }
}

const handleDeleteIngredient = (index: number) => {
  emit('delete-ingredient', index)
}
</script>

<template>
  <SharedCardCollapsible :title="`Ingrédients (${ingredients.length})`">
    <template #content>
      <div class="flex flex-col gap-4">
        <div class="grid md:grid-cols-[1fr_1fr_1fr_0.5fr] gap-4">
          <USelectMenu
            v-if="allIngredients.length"
            v-model="newIngredient.ingredient"
            placeholder="Ingrédient"
            :items="ingredientsFiltered"
            label-key="name"
            virtualize
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
          >
            Ajouter
          </UButton>
        </div>
        <div class="flex gap-2 flex-wrap">
          <UBadge
            v-for="(ingredient, index) in ingredients"
            :key="index"
            :label="getIngredientLabel(ingredient)"
            trailing-icon="fa6-solid:xmark"
            class="cursor-pointer"
            @click="handleDeleteIngredient(index)"
          />
        </div>
      </div>
    </template>
  </SharedCardCollapsible>
</template>
