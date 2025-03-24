<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

const model = defineModel<number>()
</script>

<template>
  <NumberField
    id="number"
    v-model="model"
    :min="1"
  >
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput placeholder="Quantité" />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>