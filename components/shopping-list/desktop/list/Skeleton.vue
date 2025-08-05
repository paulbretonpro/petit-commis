<template>
  <div v-for="item in 5" :key="item" class="p-4 flex flex-col gap-2">
    <div class="h-4 w-34 bg-gray-200 dark:bg-neutral-800 rounded"/>
    <div class="h-4 w-20 bg-gray-200 dark:bg-neutral-800 rounded"/>
  </div>
</template>