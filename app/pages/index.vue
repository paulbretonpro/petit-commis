<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const openModal = ref(false)

const updateSearch = useDebounceFn(() => (openModal.value = true), 1000)
</script>

<template>
  <div class="flex flex-col gap-12">
    <HomeModalConnection>
      <div
        class="w-full text-dimmed text-base bg-elevated ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary rounded-lg flex gap-4 px-4 py-3 items-center"
      >
        <UIcon name="material-symbols:search-rounded" class="text-2xl" />
        <div>Rechercher une recette</div>
      </div>
    </HomeModalConnection>

    <HomeSectionRecipes />
    <HomeSectionCatogries />
  </div>
</template>
