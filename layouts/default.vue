<template>
  <div>
    <div class="border-b py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-lg font-semibold">Petit Commis</div>
        <nav class="flex gap-6 items-center font-medium">
          <NuxtLink to="/"><Button variant="ghost">Recettes</Button></NuxtLink>
          <NuxtLink to="/"><Button variant="ghost">Menu</Button></NuxtLink>
          <NuxtLink to="/"><Button variant="ghost">Profile</Button></NuxtLink>
          <ColorModeSwitcher />
        </nav>
      </div>
    </div>
    <div class="container mx-auto py-6">
      <slot />
    </div>
  </div>
</template>