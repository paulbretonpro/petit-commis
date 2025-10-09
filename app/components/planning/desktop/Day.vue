<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import type { IPlanning } from '~/server/api/planning/type'

defineProps<{
  day: CalendarDate
  lunch?: IPlanning
  dinner?: IPlanning
  editMode?: boolean
  isSelected: boolean
}>()

const emit = defineEmits<{
  'select-day': [CalendarDate]
}>()
</script>

<template>
  <div class="flex justify-between items-center h-6">
    <div
      class="text-xs font-semibold text-gray-700"
      :class="{ 'text-primary font-bold': !day.compare(today()) }"
    >
      {{ day.day }}
    </div>

    <UCheckbox
      v-if="editMode"
      :model-value="isSelected"
      @click.prevent.stop="emit('select-day', day)"
    />
    <UButton
      v-else-if="(lunch || dinner) && isBeforeToday(day)"
      icon="fa6-solid:pen"
      size="xs"
      variant="ghost"
      color="secondary"
    />
  </div>

  <div class="grid grid-rows-2 gap-2 mt-1 overflow-hidden">
    <div class="grid grid-cols-2 gap-2">
      <UBadge
        v-if="lunch && lunch.recipe"
        as="div"
        :label="lunch.recipe?.name"
        icon="mdi:weather-sunny"
        class="max-w-fit truncate"
        :class="{ 'col-span-2': !lunch.note }"
      />
      <UBadge
        v-if="lunch && lunch.note"
        :label="lunch.note"
        icon="material-symbols:sticky-note-2-outline-rounded"
        variant="subtle"
        class="max-w-fit truncate"
        :class="{ 'col-span-2': !lunch.recipe }"
      />
    </div>

    <div class="grid grid-cols-2 gap-2">
      <UBadge
        v-if="dinner && dinner.recipe"
        color="info"
        :label="dinner.recipe?.name"
        icon="mdi:weather-night"
        class="max-w-fit truncate"
        :class="{ 'col-span-2': !dinner.note }"
      />
      <UBadge
        v-if="dinner && dinner.note"
        color="info"
        :label="dinner.note"
        variant="subtle"
        icon="material-symbols:sticky-note-2-outline-rounded"
        class="max-w-fit truncate"
        :class="{ 'col-span-2': !dinner.recipe }"
      />
    </div>
  </div>
</template>
