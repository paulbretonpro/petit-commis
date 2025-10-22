<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { isMobile } = useDevice()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Recettes',
    to: '/recipes',
    icon: 'material-symbols:cookie-outline',
    active: route.path === '/recipes',
  },
  {
    label: 'Planning',
    to: '/planning',
    icon: 'material-symbols:calendar-month-rounded',
    active: route.path.startsWith('/planning'),
  },
  {
    label: 'Liste de course',
    to: '/shopping-list',
    icon: 'material-symbols:shopping-cart-outline-rounded',
    active: route.path.startsWith('/shopping-list'),
  },
  {
    label: 'Profil',
    to: '/profile',
    icon: 'material-symbols:settings-outline',
    active: route.path.startsWith('/profile'),
  },
])
</script>

<template>
  <UHeader title="Petit commis" to="/home" mode="drawer">
    <UNavigationMenu :items />

    <template #right>
      <NuxtLink v-if="isMobile === false" to="/recipes/create">
        <UButton
          label="Créer une recette"
          icon="material-symbols:add-rounded"
          variant="soft"
        />
      </NuxtLink>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        :ui="{ item: 'my-4' }"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
