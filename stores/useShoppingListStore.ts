import type { CalendarDate } from '@internationalized/date'
import { defineStore } from 'pinia'

export const useShoppingListStore = defineStore('shopping-list', () => {
  const selectedDay = ref<CalendarDate[]>([])
  const isEditMode = ref(false)

  const nbSelectedDays = computed(() => selectedDay.value.length)

  const dayIsSelected = (day: CalendarDate) => {
    return selectedDay.value.some((d) => isSameDay(d, day))
  }
  const handleSelectDaysToShoppingList = (day: CalendarDate) => {
    if (dayIsSelected(day)) {
      selectedDay.value.splice(
        selectedDay.value.findIndex((d) => isSameDay(d, day)),
        1
      )
      return
    }
    selectedDay.value.push(day)
  }

  return {
    dayIsSelected,
    handleSelectDaysToShoppingList,
    isEditMode,
    nbSelectedDays,
    selectedDay,
  }
})
