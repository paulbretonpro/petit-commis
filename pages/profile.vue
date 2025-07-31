<script lang="ts" setup>
const { logout } = useAppSettings()
</script>

<template>
  <div class="flex flex-col gap-6">
    <PageHeader title="Mes préférences"/>

    <ProfileButtonTheme />

    <UButton @click="logout">Se déconnecter</UButton>
  </div>
</template>