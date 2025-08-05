<script setup lang="ts">
import type { IShoppingListItem } from '~/utils/types/shoppingList'

const route = useRoute()
const { isMobile } = useDevice()

const { data, pending } = useFetch<IShoppingListItem[]>(
  `/api/shopping-list/${route.params.id}`,
  {
    key: 'shopping-list-id',
    server: false,
    default: () => [],
  }
)
</script>

<template>
  <div v-if="isMobile">A venir</div>
  <LazyShoppingListDesktopById v-else :ingredients="data" :pending />
</template>
