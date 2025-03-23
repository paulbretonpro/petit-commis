<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <div>
    <div v-if="!isMobile" class="border-b py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-lg font-semibold">Petit Commis</div>
        <nav class="flex gap-6 items-center font-medium">
          <NuxtLink to="/"><Button variant="ghost">Recettes</Button></NuxtLink>
          <NuxtLink to="/menu"><Button variant="ghost">Menu</Button></NuxtLink>
          <NuxtLink to="/"><Profile /></NuxtLink>
          <ColorModeSwitcher />
        </nav>
      </div>
    </div>
    <div class="container mx-auto py-6">
      <slot />
    </div>

    <div v-if="isMobile" class="border py-2 fixed bottom-0 w-full bg-white dark:bg-neutral-950">
      <nav class="grid grid-cols-3 gap-6 font-medium">
        <NuxtLink class="mx-auto" to="/"><Button variant="ghost">Recettes</Button></NuxtLink>
        <NuxtLink class="mx-auto" to="/menu"><Button variant="ghost">Menu</Button></NuxtLink>
        <NuxtLink class="mx-auto" to="/profile"><Button variant="ghost">Profile</Button></NuxtLink>
      </nav>
    </div>
  </div>
</template>