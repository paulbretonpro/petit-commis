<template>
  <div class="flex flex-col gap-12">
    <UInput
      variant="subtle"
      placeholder="Rechercher une recette"
      icon="material-symbols:search-rounded"
      size="xl"
      class="w-full"
    />

    <HomeSectionRecipes />
    <HomeSectionCatogries />
  </div>
</template>
