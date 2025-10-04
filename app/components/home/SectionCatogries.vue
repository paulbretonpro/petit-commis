<script setup lang="ts">
const emit = defineEmits(['open-category'])

const items = [
  {
    id: 0,
    img: 'https://picsum.photos/468/468?random=1',
    label: 'Breton',
  },
  {
    id: 1,
    img: 'https://picsum.photos/468/468?random=2',
    label: 'Chinois',
  },
  {
    id: 2,
    img: 'https://picsum.photos/468/468?random=3',
    label: 'Japonais',
  },
  {
    id: 3,
    img: 'https://picsum.photos/468/468?random=5',
    label: 'Italien',
  },
  {
    id: 4,
    img: 'https://picsum.photos/468/468?random=6',
    label: 'Indien',
  },
]
</script>

<template>
  <div class="space-y-4">
    <div class="text-xl font-semibold">Catégories</div>

    <div class="grid grid-cols-2 md:flex md:flex-wrap gap-4">
      <div
        v-for="category in items"
        :key="category.id"
        class="space-y-2"
        @click="emit('open-category')"
      >
        <img :src="category.img" width="234" height="234" class="rounded-lg" />
        <div class="text-gray-500 truncate">
          {{ category.label }}
        </div>
      </div>
    </div>
  </div>
</template>
