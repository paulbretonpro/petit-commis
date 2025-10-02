<script setup lang="ts">
const { data, pending } = useFetch<{ id: number; createdAt: string }[]>(
  '/api/shopping-list',
  {
    default: () => [],
    key: 'shopping-list',
  }
)
</script>

<template>
  <div
    class="flex flex-col max-w-96 mx-auto border border-gray-200 dark:border-neutral-800 rounded-lg divide-y divide-gray-200 dark:divide-neutral-800"
  >
    <LazyShoppingListDesktopListSkeleton v-if="pending" />

    <template v-else-if="data.length">
      <NuxtLink
        v-for="(list, index) in data"
        :key="list.id"
        :to="`/shopping-list/${list.id}`"
        class="p-4 flex justify-between items-center"
      >
        <div class="flex flex-col gap-1">
          <div class="font-medium">Liste de courses {{ index + 1 }}</div>
          <div class="text-sm">
            {{ formatToDDMMYYYY(list.createdAt) }}
          </div>
        </div>
        <UButton
          variant="ghost"
          icon="material-symbols:arrow-forward-ios-rounded"
        />
      </NuxtLink>
    </template>
    <div
      v-else
      class="text-sm font-medium p-4 text-center text-gray-500 dark:text-neutral-500"
    >
      Aucune liste de course
    </div>
  </div>
</template>
