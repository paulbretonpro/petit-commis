<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import type { IPlanning } from '~/server/api/planning/type'

const props = defineProps<{
  day: CalendarDate  
  planning: IPlanning | undefined
  type: number
}>()

const emit = defineEmits<{
  'planning-has-updated': []
}>()

const toast = useToast()

const loading = ref(false)

const handleDeletePlannedRecipe = async () => {
  loading.value = true
  try {
    await $fetch(`/api/planning/${props.planning?.id}`, { method: 'DELETE' })
    emit('planning-has-updated')
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
  <div class="p-4 rounded border border-gray-200 dark:border-neutral-800 w-full flex justify-between gap-2 overflow-hidden">
    <div class="flex flex-col gap-1 flex-1">
      <div class="text-xs font-medium text-primary">{{ type === 0 ? 'Midi' : 'Soir' }}</div>
      <!-- Affichage du repas + note additionnel -->
      <div v-if="planning?.recipe" class="flex gap-2 items-center">
        <UIcon name="material-symbols:fork-spoon" />
        <div>
          {{ planning?.recipe?.name }}
          <span v-if="planning.note" class="text-sm text-gray-500">({{ planning.note }})</span>
        </div>
      </div>
      
      <!-- Affichage de la note si pas de repas  -->
      <div v-else-if="planning?.note" class="flex items-center gap-2 text-sm text-gray-500">
        <UIcon name="material-symbols:sticky-note-2-outline-rounded" />
        <div>{{ planning.note }}</div>
      </div>

      <!-- Sélection d'un repas ou d'une note -->
      <div v-else class="flex gap-4 items-center">
        <USelectMenu placeholder="Ajouter une recette" class="h-fit flex-2" />
        <USeparator  orientation="vertical" class="h-8" />
        <PlanningButtonAddNote
          :planning 
          :type
          :day
          class="h-fit flex-1 place-content-center"
          @note-has-created="emit('planning-has-updated')"
        />
      </div>
    </div>

    <div v-if="planning" class="grid grid-cols-2 gap-2">
      <PlanningButtonAddNote 
        :planning
        :type
        :day
        class="h-fit"
        @note-has-created="emit('planning-has-updated')"
      />
      <UButton 
        icon="material-symbols:delete-outline-rounded"
        color="error"
        variant="subtle"
        :loading
        class="h-fit w-8"
        @click="handleDeletePlannedRecipe"
      />
    </div>
  </div>
</template>