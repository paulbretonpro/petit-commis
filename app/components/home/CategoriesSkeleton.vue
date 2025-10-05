<template>
  <div class="flex flex-wrap gap-8">
    <div
      v-for="index in 5"
      :key="index"
      class="flex rounded-lg h-20 shadow overflow-hidden animate-pulse cursor-pointer"
    >
      <!-- Image placeholder -->
      <div class="w-20 h-full bg-gray-200 dark:bg-gray-700" />

      <!-- Texte placeholder -->
      <div
        class="w-40 bg-gray-100 dark:bg-gray-800 flex items-center px-6 py-4"
      >
        <div class="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    </div>
  </div>
</template>
