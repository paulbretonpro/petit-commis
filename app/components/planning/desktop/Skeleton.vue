<script setup lang="ts">
const days = [
  // Semaine 1
  { date: 29, isOtherMonth: true, isHighlighted: true },
  { date: 30, isOtherMonth: true, isHighlighted: true },
  { date: 1, isOtherMonth: false },
  { date: 2, isOtherMonth: false },
  { date: 3, isOtherMonth: false },
  { date: 4, isOtherMonth: false },
  { date: 5, isOtherMonth: false },
  // Semaine 2
  { date: 6, isOtherMonth: false },
  { date: 7, isOtherMonth: false },
  { date: 8, isOtherMonth: false },
  { date: 9, isOtherMonth: false },
  { date: 10, isOtherMonth: false },
  { date: 11, isOtherMonth: false },
  { date: 12, isOtherMonth: false },
  // Semaine 3
  { date: 13, isOtherMonth: false },
  { date: 14, isOtherMonth: false },
  { date: 15, isOtherMonth: false },
  { date: 16, isOtherMonth: false },
  { date: 17, isOtherMonth: false },
  { date: 18, isOtherMonth: false },
  { date: 19, isOtherMonth: false },
  // Semaine 4
  { date: 20, isOtherMonth: false },
  { date: 21, isOtherMonth: false },
  { date: 22, isOtherMonth: false },
  { date: 23, isOtherMonth: false },
  { date: 24, isOtherMonth: false },
  { date: 25, isOtherMonth: false },
  { date: 26, isOtherMonth: false },
  // Semaine 5
  { date: 27, isOtherMonth: false },
  { date: 28, isOtherMonth: false },
  { date: 29, isOtherMonth: false },
  { date: 30, isOtherMonth: false },
  { date: 31, isOtherMonth: false },
  { date: 1, isOtherMonth: true, isHighlighted: true },
  { date: 2, isOtherMonth: true, isHighlighted: true },
]
</script>

<template>
  <div class="grid grid-cols-7 gap-2 mt-2">
    <div
      v-for="(day, index) in days"
      :key="index"
      :class="[
        'h-30 flex p-4 text-sm rounded-md animate-pulse',
        day.isOtherMonth
          ? 'border border-gray-200 dark:border-neutral-800 text-gray-500'
          : 'border border-gray-200 dark:border-neutral-800 text-gray-300',
        day.isHighlighted ? 'bg-gray-200 dark:bg-neutral-800' : '',
      ]"
    >
      {{ day.date }}
    </div>
  </div>
</template>
