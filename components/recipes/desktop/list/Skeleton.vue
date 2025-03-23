<script lang="ts" setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <div v-for="key in 6" :key class="flex flex-col space-y-3">
      <Skeleton class="h-[125px] w-full rounded-md" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-3/4" />
      </div>
    </div>
  </div>
</template>