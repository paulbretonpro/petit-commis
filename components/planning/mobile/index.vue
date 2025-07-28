<script setup lang="ts">
import type { CalendarDate} from '@internationalized/date';
import type { IPlanning } from '~/server/api/planning/type'
import { subtractDays, addDays } from '~/utils/date-helper'

const currentWeekDate = ref<CalendarDate>(startOfWeek(today()))

const visibleWeekDays = computed(() => {
  const start = startOfWeek(currentWeekDate.value)
  const end = endOfWeek(currentWeekDate.value)
  const days = eachDay(start, end)

  return days.map(day => ({
    day,
    lunch: recipesPlanned.value.find(p => p.date === day.toString() && p.type === 0),
    dinner: recipesPlanned.value.find(p => p.date === day.toString() && p.type === 1)
  }))
})

const { data: recipesPlanned, pending } = useAsyncData('planning-week', () => {
  const start = startOfWeek(currentWeekDate.value)
  const end = endOfWeek(currentWeekDate.value)

  return $fetch<IPlanning[]>('/api/planning', {
    method: 'GET',
    params: {
      date_start: start.toString(),
      date_end: end.toString(),
      with_resources: true
    }
  })
}, {
  default: () => [],
  server: false,
  immediate: true,
  watch: [currentWeekDate]
})

const prevWeek = () => {
  currentWeekDate.value = subtractDays(currentWeekDate.value, 7)
}
const nextWeek = () => {
  currentWeekDate.value = addDays(currentWeekDate.value, 7)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Navigation semaine -->
    <div class="flex items-center justify-between">
      <UButton icon="material-symbols:arrow-left-alt-rounded" @click="prevWeek" />
      <div class="text-center text-base font-medium">
        Semaine du {{ visibleWeekDays[0].day.day }}/{{ visibleWeekDays[0].day.month }}
      </div>
      <UButton icon="material-symbols:arrow-right-alt-rounded" @click="nextWeek" />
    </div>

    <!-- Chargement -->
    <PlanningMobileSkeleton v-if="pending" />

    <!-- Planning jour par jour -->
    <div v-else class="flex flex-col gap-3">
      <div
        v-for="({ day, lunch, dinner }, index) in visibleWeekDays"
        :key="index"
        class="border border-gray-200 dark:border-neutral-800 rounded-lg p-4"
      >
        <div class="text-sm font-semibold text-gray-700 flex justify-between">
          <span>
            {{ WEEK_DAYS_LABELS[(day.toDate().getDay() + 6) % 7] }} {{ day.day }}/{{ day.month }}
          </span>
          <span
            v-if="!day.compare(today())"
            class="text-primary-600 font-bold text-xs"
          >
            Aujourd'hui
          </span>
        </div>

        <div v-if="lunch || dinner" class="flex flex-col gap-2 mt-2">
          <UBadge v-if="lunch" :label="lunch?.recipe?.name" icon="mdi:weather-sunny" class="max-w-fit truncate"/>
          <UBadge v-if="dinner" color="info" :label="dinner?.recipe?.name" icon="mdi:weather-night" class="max-w-fit truncate"/>
        </div>
        <div v-else class="text-sm text-gray-500 dark:text-neutral-700 text-center">Pas de recette</div>
      </div>
    </div>
  </div>
</template>
