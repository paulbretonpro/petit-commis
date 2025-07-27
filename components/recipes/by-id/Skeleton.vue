<template>
  <div class="dark:bg-gray-900 text-white space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-start">
      <div class="space-y-2">
        <div class="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"/>
        <div class="flex gap-2">
          <div class="h-6 w-24 bg-primary-700 rounded-full animate-pulse"/>
          <div class="h-6 w-10 bg-primary-700 rounded-full animate-pulse"/>
        </div>
      </div>
      <div class="h-8 w-20 bg-primary-600 rounded animate-pulse"/>
    </div>

    <!-- Image & Ingrédients -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Image -->
      <div class="rounded-lg bg-gray-200 dark:bg-gray-700 h-64 w-full lg:w-1/2 animate-pulse"/>

      <!-- Ingrédients -->
      <div class="rounded-lg dark:bg-gray-800 ring ring-gray-200 dark:ring-gray-700 flex flex-col w-full lg:w-1/2">
        <div class="p-4">
          <div class="h-5 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"/>
        </div>
        <div class="flex-1 p-4 space-y-4 overflow-y-auto max-h-64">
          <div class="flex items-center gap-3">
            <div class="h-6 w-6 bg-gray-200 dark:bg-primary-600 rounded-full animate-pulse"/>
            <div class="h-4 w-40 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"/>
          </div>
          <div class="flex items-center gap-3">
            <div class="h-6 w-6 bg-gray-200 dark:bg-primary-600 rounded-full animate-pulse"/>
            <div class="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"/>
          </div>
          <div class="flex items-center gap-3">
            <div class="h-6 w-6 bg-gray-200 dark:bg-primary-600 rounded-full animate-pulse"/>
            <div class="h-4 w-44 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"/>
          </div>
          <div class="flex items-center gap-3">
            <div class="h-6 w-6 bg-gray-200 dark:bg-primary-600 rounded-full animate-pulse"/>
            <div class="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Étapes -->
    <div class="rounded-lg dark:bg-gray-800 ring ring-gray-200 dark:ring-gray-700 p-4 space-y-3">
      <div class="h-5 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"/>
      <div class="flex gap-2">
        <div class="h-6 w-20 bg-primary-700 rounded-full animate-pulse"/>
      </div>
      <div class="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"/>
    </div>
  </div>
</template>