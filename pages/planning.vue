<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <LazyPlanningMobile v-if="isMobile" />
  <LazyPlanningDesktop v-else />
</template>