<script lang="ts" setup>
const { logout } = useAppSettings()
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="text-2xl font-bold">Mes préférences</div>
    <div class="flex flex-col gap-2">
      <div class="font-medium">Thème :</div>
      <ColorModeSwitcher />
    </div>

    <Button variant="destructive" @click="logout">Se déconnecter</Button>
  </div>
</template>