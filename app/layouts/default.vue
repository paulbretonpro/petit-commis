<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <UContainer v-if="isMobile" class="pt-4 pb-16">
    <slot />
  </UContainer>

  <UContainer v-else class="py-6 min-h-[calc(100vh-100px))] relative">
    <slot />
  </UContainer>
</template>
