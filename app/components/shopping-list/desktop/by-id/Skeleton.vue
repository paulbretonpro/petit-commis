<template>
  <div v-for="item in 5" :key="item" class="p-4 flex my-2 gap-2">
    <div class="h-5 w-5 bg-gray-200 dark:bg-neutral-800 rounded"/>
    <div class="h-5 w-20 bg-gray-200 dark:bg-neutral-800 rounded"/>
    <div class="h-5 w-2 bg-gray-200 dark:bg-neutral-800 rounded ml-auto mr-3"/>
  </div>
</template>