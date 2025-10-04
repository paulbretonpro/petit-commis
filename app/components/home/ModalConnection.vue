<template>
  <UDrawer>
    <slot />

    <template #content>
      <div class="space-y-4 p-4">
        <div class="space-y-2">
          <div class="text-toned font-medium text-center">
            La recherche de recette est disponible uniquement pour les
            utilisateurs connecté
          </div>

          <div class="text-dimmed text-center">Ou bien créer un compte</div>
        </div>

        <div class="flex items-center justify-center">
          <NuxtLink to="/login">
            <UButton trailing-icon="material-symbols:login-rounded" size="xl">
              Se connecter
            </UButton>
          </NuxtLink>
        </div>

        <USeparator icon="material-symbols:chef-hat-outline-rounded" />

        <div class="flex items-center justify-center">
          <NuxtLink to="/login">
            <UButton
              trailing-icon="material-symbols:group-add-outline-rounded"
              size="xl"
            >
              Créer un compte
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
