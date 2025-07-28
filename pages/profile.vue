<script lang="ts" setup>
const { logout } = useAppSettings()
</script>

<template>
  <div class="space-y-4">
    <PageHeader title="Mes préférences"/>

    <UButton @click="logout">Se déconnecter</UButton>
  </div>
</template>