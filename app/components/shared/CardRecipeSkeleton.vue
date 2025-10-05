<template>
  <div
    class="rounded-xl shadow dark:shadow-xl overflow-hidden animate-pulse w-80"
  >
    <!-- Image placeholder -->
    <div class="relative bg-gray-200 dark:bg-gray-700 h-52 w-full">
      <div
        class="absolute bottom-3 left-4 h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-md"
      />
    </div>

    <!-- Text placeholder -->
    <div class="space-y-2 p-4">
      <!-- Titre -->
      <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />

      <div class="flex items-center justify-between gap-2">
        <!-- Catégorie -->
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />

        <!-- Bouton -->
        <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-8" />
      </div>
    </div>
  </div>
</template>
