<script setup lang="ts">
import type { IShoppingListItem } from '~/utils/types/shoppingList'

const route = useRoute()

const { data } = useFetch<IShoppingListItem[]>(
  `/api/shopping-list/${route.params.id}`,
  {
    key: 'shopping-list-id',
    server: false,
    default: () => [],
  }
)
</script>

<template>
  <ShoppingListDesktop :ingredients="data" />
</template>
