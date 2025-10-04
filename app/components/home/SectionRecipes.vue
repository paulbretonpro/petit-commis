<script setup lang="ts">
const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6',
]
</script>

<template>
  <div class="space-y-4">
    <div class="text-xl font-semibold">Recettes favorites</div>

    <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-1/2' }">
      <div class="max-w-96 space-y-2">
        <img :src="item" width="234" height="234" class="rounded-lg" />
        <div class="space-y-1">
          <div class="font-medium">Carbonara</div>
          <div class="line-clamp-2 text-gray-500">
            plât italien avec des pâtes et de la crème pâtes et de la crème
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>
