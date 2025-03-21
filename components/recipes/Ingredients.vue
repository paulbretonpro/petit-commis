<script setup lang="ts">
// Fetch ingredients
// const { data: categories, status } = await useFetch<ICategory[]>('/api/categories', {
//   key: 'categories'
// })

// const pending = computed(() => status.value === 'pending')
</script>
<template>
  <div class="flex flex-col gap-2">
    <Label>Ingredients</Label>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Ex: beurre" />
        <SelectContent>
          <SelectItem disabled value="null">
            Aucun ingrédient
          </SelectItem>
        </SelectContent>
      </SelectTrigger>
    </Select>
  </div>
</template>