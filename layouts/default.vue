<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <div v-if="isMobile">
    <UContainer class="pt-4 pb-16">
      <slot />
    </UContainer>
    <div class="border border-gray-200 dark:border-neutral-800 py-2 fixed bottom-0 w-full bg-white dark:bg-neutral-950">
      <nav class="grid grid-cols-3 gap-6 font-medium">
        <NuxtLink class="mx-auto" to="/"><UButton variant="ghost">Recettes</UButton></NuxtLink>
        <NuxtLink class="mx-auto" to="/planning"><UButton variant="ghost">Planning</UButton></NuxtLink>
        <NuxtLink class="mx-auto" to="/profile"><UButton variant="ghost">Profile</UButton></NuxtLink>
      </nav>
    </div>
  </div>

  <div v-else>
    <div class="border-b border-gray-200 dark:border-neutral-800 py-4 sticky top-0 z-50 bg-white dark:bg-neutral-900">
      <UContainer class="flex justify-between items-center">
        <div class="text-lg font-semibold">Petit Commis</div>
        <nav class="flex gap-6 items-center font-medium">
          <NuxtLink to="/"><UButton variant="ghost">Recettes</UButton></NuxtLink>
          <NuxtLink to="/planning"><UButton variant="ghost">Planning</UButton></NuxtLink>
          <NuxtLink to="/profile"><UButton variant="ghost">Profile</UButton></NuxtLink>
          <ProfileButtonTheme />
        </nav>
      </UContainer>
    </div>
    <UContainer class="py-6 min-h-[calc(100vh-100px))] relative">
      <slot />
    </UContainer>
  </div>
</template>