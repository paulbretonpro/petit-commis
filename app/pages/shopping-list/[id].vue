<script setup lang="ts">
const route = useRoute()

const { fetchShoppingListItem } = useShoppingListItemStore()
const { items } = storeToRefs(useShoppingListItemStore())

const pending = ref(true)

onMounted(async () => {
  pending.value = true
  await fetchShoppingListItem(Number(route.params.id as string))
  pending.value = false
})
</script>

<template>
  <LazyShoppingListDesktopById :ingredients="items" :pending />
</template>
