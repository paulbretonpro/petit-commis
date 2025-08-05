<script setup lang="ts">
import type { IShoppingListItem } from '~/utils/types/shoppingList'

const open = defineModel<boolean>({ required: true })

const props = defineProps<{
  ingredient: IShoppingListItem
}>()

const { fetchShoppingListItem } = useShoppingListItemStore()

const pending = ref(false)
const form = ref<{
  quantity: number
  unit: string
}>({
  quantity: Number(props.ingredient.quantity),
  unit: props.ingredient.unit,
})

const handleUpdateItem = async () => {
  pending.value = true

  try {
    await $fetch(
      `/api/shopping-list/${props.ingredient.shoppingListId}/item/${props.ingredient.id}`,
      {
        method: 'PUT',
        body: {
          ...form.value,
          quantity: String(form.value.quantity),
        },
      }
    )

    await fetchShoppingListItem(props.ingredient.shoppingListId)
    open.value = false
  } finally {
    pending.value = false
  }
}
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
      <div class="flex gap-4 w-full">
        <UButton variant="outline" block @click="() => (open = false)"
          >Annuler</UButton
        >
        <UButton block :loading="pending" @click="handleUpdateItem"
          >Confirmer</UButton
        >
      </div>
    </template>
  </UModal>
</template>
