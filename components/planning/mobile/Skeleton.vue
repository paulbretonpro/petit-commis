<template>
  <div class="space-y-4">
    <div v-for="i in 5" :key="i" class="border border-gray-200 dark:border-neutral-800 dark:bg-neutral-800 rounded-lg p-4 space-y-3 animate-pulse">
      <div class="h-4 w-24 bg-gray-200 dark:bg-neutral-600 rounded"/>
      
      <div v-for="n in 2" :key="n" class="flex items-center gap-2">
        <div class="h-5 w-5 bg-gray-200 dark:bg-neutral-600 rounded-full"/>
        <div class="h-5 w-32 bg-gray-200 dark:bg-neutral-600 rounded"/>
      </div>
    </div>
  </div>
</template>