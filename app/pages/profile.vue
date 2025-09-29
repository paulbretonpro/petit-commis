<script lang="ts" setup>
const { logout } = useAppSettings()
const user = useSupabaseUser()
</script>

<template>
  <div class="flex flex-col gap-6">
    <PageHeader title="Mes préférences" />

    <div class="mx-auto space-y-6 w-full md:w-1/2">
      <UUser
        :name="user?.email"
        description="Meilleur(e) cuisinier(e)"
        :avatar="{
          src: 'https://i.pravatar.cc/150?u=john-doe',
        }"
        size="xl"
      />
      <UCard>
        <div class="space-y-4">
          <div class="flex items-center gap-4 text-sm font-medium">
            <div>Thème :</div>
            <UColorModeSelect class="flex-1" />
          </div>

          <UButton
            block
            variant="ghost"
            color="error"
            icon="material-symbols:logout-rounded"
            class="mt-8"
            @click="logout"
            >Se déconnecter</UButton
          >
        </div>
      </UCard>
    </div>
  </div>
</template>
