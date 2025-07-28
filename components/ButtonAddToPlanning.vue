<script setup lang="ts">
import { today, getLocalTimeZone } from '@internationalized/date'

defineProps<{
  recipeId: number
}>()

const {
  btnLoading,
  getUnvailableDate,
  handleAddRecipeToPlanning,
  handleGetUnavailableDate,
  handleReset,
  radioGroupItems,
  selectDay
} = usePlanning()

watch(() => selectDay.value.date, () => selectDay.value.type = undefined)
</script>

<template>
  <UModal title="Ajouter au planning" @update:open="handleReset">
    <UButton variant="ghost" icon="fa6-solid:plus" block @click.prevent="handleGetUnavailableDate">Ajouter au menu</UButton>

    <template #body>
      <div class="flex flex-col gap-4 disabled:">
        <UCalendar
          v-model="selectDay.date"
          :min-value="today(getLocalTimeZone())"
          :default-value="today(getLocalTimeZone())"
          :year-controls="false"
          :is-date-unavailable="getUnvailableDate"
        />

        <URadioGroup v-model="selectDay.type" label indicator="start" variant="card" :items="radioGroupItems" />
      </div>
    </template>

    <template #footer="{ close }">
      <div class="grid grid-cols-2 gap-4 w-full">
        <UButton variant="ghost" block @click="close">Annuler</UButton>
        <UButton block :loading="btnLoading" @click="handleAddRecipeToPlanning(recipeId, close)">Confirmer</UButton>
      </div>
    </template>
  </UModal>
</template>