<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <UButton
    color="primary"
    icon="material-symbols:add"
    variant="subtle"
    block
    label="Ajouter un ingrédient"
    @click="() => (open = !open)"
  />
</template>
