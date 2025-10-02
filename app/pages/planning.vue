<script setup lang="ts">
const toast = useToast()
const { isMobile } = useDevice()
const { isEditMode, nbSelectedDays, selectedDay } = storeToRefs(
  useShoppingListStore()
)

const boutonLabel = computed(() => {
  return nbSelectedDays.value > 0
    ? `Terminer (${nbSelectedDays.value})`
    : 'Terminer'
})

const handleCancel = () => {
  selectedDay.value = []
  isEditMode.value = false
}

const handleSubmit = async () => {
  try {
    await $fetch('/api/shopping-list', {
      method: 'POST',
      body: {
        dates: selectedDay.value.map((day) => day.toString()),
      },
    })

    selectedDay.value = []
    await navigateTo('/shopping-list')
  } catch {
    toast.add({
      title: 'Erreur',
      description:
        'Une erreur est survenue lors de la création de la liste de courses',
      color: 'error',
    })
  } finally {
    isEditMode.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex gap-4 justify-end">
      <UButton
        v-if="!isEditMode"
        label="Créer une liste de courses"
        @click="() => (isEditMode = true)"
      />
      <template v-if="isEditMode">
        <UButton variant="ghost" @click="handleCancel">Annuler</UButton>
        <UButton :label="boutonLabel" @click="handleSubmit" />
      </template>
    </div>
    <LazyPlanningMobile v-if="isMobile" />
    <LazyPlanningDesktop v-else :edit-mode="isEditMode" />
  </div>
</template>
