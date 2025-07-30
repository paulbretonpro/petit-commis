<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-4">
    <div v-for="key in 9" :key class="flex flex-col rounded-xl border border-gray-200 dark:border-neutral-800 animate-pulse">
      <div class="grow min-h-40 bg-gray-200 dark:bg-neutral-800 flex items-center justify-center">
        <div class="w-12 h-12 bg-gray-300 dark:bg-neutral-700 rounded-full" />
      </div>
      <div class="p-4 space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/2" />
        <div class="h-3 bg-gray-100 dark:bg-neutral-700 rounded w-1/3" />
      </div>
      <div class="px-4 pb-4">
        <div class="h-8 w-full bg-green-100 text-green-600 text-sm font-medium flex items-center justify-center rounded hover:bg-green-200 cursor-pointer">
          + Ajouter au menu
        </div>
      </div>
    </div>
  </div>
</template>
