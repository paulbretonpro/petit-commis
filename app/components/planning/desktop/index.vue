<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import type { IPlanning } from '~~/server/api/planning/type'

defineProps<{
  editMode: boolean
}>()

const { dayIsSelected, handleSelectDaysToShoppingList } = useShoppingListStore()

const currentMonthDate = ref<CalendarDate>(today())
const openEditDay = ref(false)
const selectedDay = ref<CalendarDate>()
const loading = ref(true)
const recipesPlanned = ref<IPlanning[]>([])

const recipeByDay = computed(() => {
  if (selectedDay.value === undefined) {
    return
  }

  return {
    lunch: recipesPlanned.value.find(
      (planning) =>
        planning.date === selectedDay.value?.toString() && planning.type === 0
    ),
    dinner: recipesPlanned.value.find(
      (planning) =>
        planning.date === selectedDay.value?.toString() && planning.type === 1
    ),
  }
})

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

const visibleDays = computed<
  {
    day: CalendarDate
    lunch: IPlanning | undefined
    dinner: IPlanning | undefined
  }[]
>(() => {
  const firstOfMonth = new CalendarDate(
    currentMonthDate.value.year,
    currentMonthDate.value.month,
    1
  )
  const lastOfMonth = new CalendarDate(
    currentMonthDate.value.year,
    currentMonthDate.value.month,
    firstOfMonth.calendar.getDaysInMonth(firstOfMonth)
  )

  const start = startOfWeek(firstOfMonth)
  const end = endOfWeek(lastOfMonth)

  const allDays = eachDay(start, end)

  return allDays.map((day) => ({
    day,
    lunch: recipesPlanned.value.find(
      (planning) => planning.date === day.toString() && planning.type === 0
    ),
    dinner: recipesPlanned.value.find(
      (planning) => planning.date === day.toString() && planning.type === 1
    ),
  }))
})

const fetchPlannedDays = async () => {
  loading.value = true

  try {
    recipesPlanned.value = await $fetch<IPlanning[]>('/api/planning', {
      method: 'GET',
      params: {
        date_start: visibleDays.value[0].day.toString(),
        date_end:
          visibleDays.value[visibleDays.value.length - 1].day.toString(),
        with_resources: true,
      },
    })
  } finally {
    loading.value = false
  }
}

const prevMonth = () => {
  currentMonthDate.value = subtractMonths(currentMonthDate.value, 1)

  fetchPlannedDays()
}

const nextMonth = () => {
  currentMonthDate.value = addMonths(currentMonthDate.value, 1)

  fetchPlannedDays()
}

const setRecipeDay = (day: CalendarDate) => {
  selectedDay.value = day

  openEditDay.value = true
}

onMounted(fetchPlannedDays)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <UButton
        variant="subtle"
        icon="material-symbols:arrow-left-alt-rounded"
        @click="prevMonth"
      />
      <h2 class="text-2xl font-semibold">
        {{ formattedMonth }}
      </h2>
      <UButton
        variant="subtle"
        icon="material-symbols:arrow-right-alt-rounded"
        @click="nextMonth"
      />
    </div>

    <div class="grid grid-cols-7 gap-2 text-center font-medium text-gray-600">
      <div v-for="(day, index) in WEEK_DAYS_LABELS" :key="index">{{ day }}</div>
    </div>

    <PlanningDesktopSkeleton v-if="loading" />

    <div v-else class="grid grid-cols-7 gap-2 mt-2">
      <div
        v-for="({ day, lunch, dinner }, index) in visibleDays"
        :key="index"
        class="border border-gray-200 dark:border-neutral-800 rounded-lg h-30 p-4 cursor-pointer overflow-hidden"
        :class="{
          'bg-gray-100 dark:bg-neutral-800': !isSameMonth(
            day,
            currentMonthDate
          ),
        }"
        @click="setRecipeDay(day)"
      >
        <PlanningDesktopDay
          :day
          :lunch
          :dinner
          :edit-mode
          :is-selected="dayIsSelected(day)"
          @select-day="handleSelectDaysToShoppingList"
        />
      </div>
    </div>
  </div>

  <LazyPlanningModalEditPlanning
    v-if="selectedDay"
    v-model="openEditDay"
    :day="selectedDay"
    :recipes="recipeByDay"
    @planning-has-updated="fetchPlannedDays"
  />
</template>
