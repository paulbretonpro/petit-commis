<script setup lang="ts">
import { fr } from '@nuxt/ui/locale'
</script>

<template>
  <Loader />
  <UApp :locale="fr">
    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
