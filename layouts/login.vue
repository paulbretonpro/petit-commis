<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <div class="h-screen flex overflow-hidden">
    <div
      v-if="!isMobile"
      class="bg-no-repeat bg-cover bg-[url(/assets/images/background-login-2.png)] bg-center h-full w-2/3"
    />
    <div class="m-auto grow p-6">
      <slot />
    </div>
  </div>
</template>
