<script setup lang="ts">
import type { IPlanning } from '~/server/api/planning/type'

const props = defineProps<{
  planning: IPlanning | undefined
}>()

const emit = defineEmits<{
  'planned-recipe-has-deleted': []
}>()

const toast = useToast()

const loading = ref(false)

const handleDeletePlannedRecipe = async () => {
  loading.value = true
  try {
    await $fetch(`/api/planning/${props.planning?.id}`, { method: 'DELETE' })
    emit('planned-recipe-has-deleted')
  } catch {
    toast.add({
      title: 'Echec',
      description: 'Impossible de supprimer cette recipe du planning'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-4 rounded border border-gray-200 dark:border-neutral-800 w-full flex justify-between">
    <div class="grow flex flex-col gap-1">
      <div class="text-xs font-medium text-primary">Midi</div>
      <div v-if="planning?.recipe">{{ planning?.recipe?.name }}</div>
      <USelectMenu v-else placeholder="Ajouter une recette" class="w-full" />
    </div>
    
    <UButton 
      v-if="planning?.recipe"
      :loading
      icon="material-symbols:delete-outline-rounded"
      color="error"
      variant="subtle"
      class="h-fit"
      @click="handleDeletePlannedRecipe"
    />
  </div>
</template>