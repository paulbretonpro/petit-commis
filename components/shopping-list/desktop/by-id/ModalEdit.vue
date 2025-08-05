<script setup lang="ts">
import type { IShoppingListItem } from '~/utils/types/shoppingList'

const open = defineModel<boolean>({ required: true })

const props = defineProps<{
  ingredient: IShoppingListItem
}>()

const form = ref<{
  quantity: number
  unit: string
}>({
  quantity: Number(props.ingredient.quantity),
  unit: props.ingredient.unit,
})
</script>

<template>
  <UModal v-model:open="open">
    <template #title>Ajouter un ingredient</template>

    <template #body>
      <div class="grid md:grid-cols-[1fr_1fr] gap-4">
        <UInputNumber v-model="form.quantity" placeholder="Quantité" :min="1" />
        <USelect v-model="form.unit" placeholder="Unité" :items="UNITS" />
      </div>
    </template>

    <template #footer>
      <UButton variant="outline" block @click="() => (open = false)"
        >Annuler</UButton
      >
      <UButton block>Confirmer</UButton>
    </template>
  </UModal>
</template>
