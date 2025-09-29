<script setup lang="ts">
import { fr } from '@nuxt/ui/locale'
</script>

<template>
  <Loader />
  <UApp :locale="fr">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
