<script setup lang="ts">
const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
]
</script>

<template>
  <div class="space-y-4">
    <div class="text-xl font-semibold">Catégories</div>

    <div class="grid grid-cols-2 gap-4">
      <div v-for="img in items" :key="img" class="space-y-2">
        <img :src="img" width="234" height="234" class="rounded-lg" />
        <div class="truncate">Nom de catégory</div>
      </div>
    </div>
  </div>
</template>
