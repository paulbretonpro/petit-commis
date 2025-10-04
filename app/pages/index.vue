<script setup lang="ts">
import type { ICategory } from '~~/server/api/categories/type'

const auth = useSupabaseUser()

const openModal = ref(false)
const categories = ref<ICategory[]>([
  {
    id: 0,
    name: 'Breton',
  },
  {
    id: 1,
    name: 'Viêtnamien',
  },
  {
    id: 2,
    name: 'Chinois',
  },
])

const handleOpenDrawer = () => (openModal.value = true)

watchEffect(() => {
  if (auth.value) {
    navigateTo('/home')
  }
})
</script>

<template>
  <div class="flex flex-col gap-12">
    <HomeModalConnection v-model="openModal">
      <div
        class="w-full text-dimmed text-base ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary rounded-lg flex gap-4 px-4 py-3 items-center"
      >
        <UIcon name="material-symbols:search-rounded" class="text-2xl" />
        <div>Rechercher une recette</div>
      </div>
    </HomeModalConnection>

    <HomeSectionRecipes @open-recipe="handleOpenDrawer" />
    <HomeSectionCatogries :categories @open-category="handleOpenDrawer" />
  </div>
</template>
