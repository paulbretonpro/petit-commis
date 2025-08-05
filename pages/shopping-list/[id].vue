<script setup lang="ts">
const route = useRoute()
const { isMobile } = useDevice()

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
  <div v-if="isMobile">A venir</div>
  <LazyShoppingListDesktopById v-else :ingredients="items" :pending />
</template>
