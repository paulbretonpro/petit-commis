<script setup lang="ts">
defineProps<{
  title?: string | undefined
}>()

const router = useRouter()
const handleGoBack = () => router.back()
</script>

<template>
  <div class="flex items-center">
    <UButton
      icon="material-symbols:arrow-left-alt-rounded"
      variant="ghost"
      size="xl"
      @click="handleGoBack"
    />
    <div v-if="title" class="text-2xl font-semibold" @click="handleGoBack">
      {{ title }}
    </div>

    <div class="ml-auto">
      <slot />
    </div>
  </div>
</template>
