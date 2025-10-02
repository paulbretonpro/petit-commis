<script setup lang="ts">
import type { IShoppingListItem } from '~/utils/types/shoppingList'

defineProps<{
  ingredients: IShoppingListItem[]
  pending: boolean
}>()
</script>

<template>
  <div class="max-w-96 mx-auto space-y-4">
    <div
      class="flex flex-col border border-gray-200 dark:border-neutral-800 rounded-lg divide-y divide-gray-200 dark:divide-neutral-800"
    >
      <LazyShoppingListDesktopByIdSkeleton v-if="pending" />

      <template v-else-if="ingredients.length">
        <ShoppingListDesktopByIdItem
          v-for="item in ingredients"
          :key="item.id"
          :ingredient="item"
        />
      </template>

      <div
        v-else
        class="text-sm font-medium p-4 text-center text-gray-200 dark:text-neutral-500"
      >
        Aucun item
      </div>
    </div>
    <ShoppingListDesktopByIdButtonAddIngredient />
  </div>
</template>
