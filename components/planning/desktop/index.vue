<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import type { IPlanning } from '~/server/api/planning/type'

const currentMonthDate = ref<CalendarDate>(today())

const formattedMonth = computed(() => {
  const date = new Date(
    currentMonthDate.value.year,
    currentMonthDate.value.month - 1,
    1
  )
  return date.toLocaleString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })
})

const visibleDays = computed(() => {
  const firstOfMonth = new CalendarDate(currentMonthDate.value.year, currentMonthDate.value.month, 1)
  const lastOfMonth = new CalendarDate(currentMonthDate.value.year, currentMonthDate.value.month, firstOfMonth.calendar.getDaysInMonth(firstOfMonth))

  const start = startOfWeek(firstOfMonth)
  const end = endOfWeek(lastOfMonth)

  const allDays = eachDay(start, end)

  return allDays.map(day => ({
    day,
    lunch: recipesPlanned.value.find(planning => planning.date === day.toString() && planning.type === 0),
    dinner: recipesPlanned.value.find(planning => planning.date === day.toString() && planning.type === 1)
  }))
})

const { data: recipesPlanned, pending } = useAsyncData('planning', () => {
  const firstOfMonth = new CalendarDate(currentMonthDate.value.year, currentMonthDate.value.month, 1)
  const lastOfMonth = new CalendarDate(currentMonthDate.value.year, currentMonthDate.value.month, firstOfMonth.calendar.getDaysInMonth(firstOfMonth))

  return $fetch<IPlanning[]>('/api/planning', {
    method: 'GET',
    params: {
      date_start: firstOfMonth.toString(),
      date_end: lastOfMonth.toString(),
      with_resources: true
    }
  })
}, {
  default: () => [],
  server: false,
  immediate: true,
  watch: [currentMonthDate]
})

const prevMonth = () => {
  currentMonthDate.value = subtractMonths(currentMonthDate.value, 1)
}

const nextMonth = () => {
  currentMonthDate.value = addMonths(currentMonthDate.value, 1)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <UButton variant="subtle" icon="material-symbols:arrow-left-alt-rounded" @click="prevMonth" />
      <h2 class="text-2xl font-semibold">
        {{ formattedMonth }}
      </h2>
      <UButton variant="subtle" icon="material-symbols:arrow-right-alt-rounded" @click="nextMonth" />
    </div>

    <div class="grid grid-cols-7 gap-2 text-center font-medium text-gray-600">
      <div v-for="(day, index) in WEEK_DAYS_LABELS" :key="index">{{ day }}</div>
    </div>

    <PlanningSkeleton v-if="pending" />

    <div v-else class="grid grid-cols-7 gap-2 mt-2">
      <div
        v-for="({ day, lunch, dinner }, index) in visibleDays"
        :key="index"
        class="border border-gray-200 dark:border-neutral-800 rounded-lg h-24 p-4"
        :class="{ 'bg-gray-100 dark:bg-neutral-800': !isSameMonth(day, currentMonthDate) }"
      >
        <div 
          class="text-xs font-semibold text-gray-700"
          :class="{ 'text-primary font-bold': !day.compare(today()) }"
        >
          {{ day.day }}
        </div>
        
        <div class="flex flex-col gap-2 mt-1">
          <span v-if="lunch" class="max-w-fit truncate bg-blue-500 text-xs font-medium text-white rounded px-2 py-0.5">
            {{ lunch?.recipe?.name }}
          </span>
          <span v-if="dinner" class="max-w-fit truncate bg-primary-500 text-xs font-medium text-white rounded px-2 py-0.5">
            {{ dinner?.recipe?.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>