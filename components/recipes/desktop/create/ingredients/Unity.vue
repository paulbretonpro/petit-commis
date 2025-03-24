<script setup lang="ts">
const model = defineModel<string>()
  
const units = [
  'g',
  'kg',
  'c.a.s',
  'c.a.c',
  'l',
  'ml',
  'cl',
  'sachet',
]
</script>
<template>
  <Select v-model="model">
    <SelectTrigger>
      <SelectValue placeholder="Unité" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="unit in units" :key="unit" :value="unit">
        {{ unit }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>