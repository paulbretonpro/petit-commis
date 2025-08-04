<script setup lang="ts">
import type { IShoppingListItem } from '~/utils/types/shoppingList'

defineProps<{
  ingredients: IShoppingListItem[]
}>()
</script>

<template>
  <div class="max-w-96 mx-auto space-y-4">
    <div
      class="flex flex-col border border-gray-200 dark:border-neutral-800 rounded-lg divide-y divide-gray-200 dark:divide-neutral-800"
    >
      <ShoppingListDesktopItem
        v-for="item in ingredients"
        :key="item.id"
        :ingredient="item"
      />
    </div>

    <ShoppingListDesktopButtonAddIngredient />
  </div>
</template>
