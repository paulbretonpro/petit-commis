<script setup lang="ts">
const show = defineModel<boolean>()
</script>

<template>
  <UDrawer v-model:open="show">
    <slot />

    <template #content>
      <div class="space-y-6 p-8">
        <div class="space-y-2">
          <div class="text-toned font-medium text-center">
            La recherche de recettes est disponible uniquement pour les
            utilisateurs connectés
          </div>

          <div class="text-dimmed text-center">Accéder à votre compte</div>
        </div>

        <div>
          <NuxtLink to="/login">
            <UButton
              variant="soft"
              color="neutral"
              icon="material-symbols:login-rounded"
              size="xl"
              block
            >
              Se connecter
            </UButton>
          </NuxtLink>
        </div>

        <USeparator icon="material-symbols:chef-hat-outline-rounded" />

        <div>
          <NuxtLink to="/login">
            <UButton
              variant="soft"
              color="neutral"
              icon="material-symbols:group-add-outline-rounded"
              size="xl"
              block
            >
              Créer un compte
            </UButton>
          </NuxtLink>
        </div>

        <div class="text-dimmed text-center">
          Créer un compte pour ajouter vos recettes et simplifier les courses
        </div>
      </div>
    </template>
  </UDrawer>
</template>
