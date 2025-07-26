<script setup lang="ts">
const { isMobile } = useDevice()

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <div v-if="isMobile" class="border py-2 fixed bottom-0 w-full bg-white dark:bg-neutral-950">
    <nav class="grid grid-cols-3 gap-6 font-medium">
      <NuxtLink class="mx-auto" to="/"><UButton variant="ghost">Recettes</UButton></NuxtLink>
      <NuxtLink class="mx-auto" to="/menu"><UButton variant="ghost">Menu</UButton></NuxtLink>
      <NuxtLink class="mx-auto" to="/profile"><UButton variant="ghost">Profile</UButton></NuxtLink>
    </nav>
  </div>

  <div v-else class="h-screen">
    <div class="border-b border-gray-200 dark:border-neutral-800 py-4 sticky top-0 z-50 bg-white dark:bg-neutral-900">
      <UContainer class="flex justify-between items-center">
        <div class="text-lg font-semibold">Petit Commis</div>
        <nav class="flex gap-6 items-center font-medium">
          <NuxtLink to="/"><UButton variant="ghost">Recettes</UButton></NuxtLink>
          <NuxtLink to="/menu"><UButton variant="ghost">Menu</UButton></NuxtLink>
          <NuxtLink to="/"><Profile /></NuxtLink>
          <ClientOnly v-if="!colorMode?.forced">
            <UButton
              :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="neutral"
              variant="ghost"
              @click="isDark = !isDark"
            />

            <template #fallback>
              <div class="size-8" />
            </template>
          </ClientOnly>
        </nav>
      </UContainer>
    </div>
    <UContainer class="py-6">
      <slot />
    </UContainer>
  </div>
</template>