<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import type { IPlanning } from '~/server/api/planning/type'

const props = defineProps<{
  day: CalendarDate
  planning: IPlanning | undefined
  type: number
}>()

const emit = defineEmits<{
  'note-has-created': []
}>()

const toast = useToast()

const newNote = ref<string | undefined>(props.planning?.note)
const loading = ref(false)

const handleAddNote = async (close: () => void) => {
  loading.value = true
  try {
    if (props.planning?.id) {
      await $fetch(`/api/planning/${props.planning.id}`, {
        method: 'PUT',
        body: {
          note: newNote.value,
        },
      })
    } else {
      await $fetch('/api/planning', {
        method: 'POST',
        body: {
          date: props.day.toString(),
          type: props.type,
          note: newNote.value,
        },
      })
    }

    emit('note-has-created')
    close()
  } catch {
    toast.add({
      title: 'Echec',
      description: 'Impossible de supprimer cette recipe du planning',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal title="Ajouter une note">
    <UButton
      icon="material-symbols-light:add-notes-outline-rounded"
      variant="ghost"
    />

    <template #body>
      <UTextarea v-model="newNote" placeholder="Note" class="w-full" />
    </template>
    <template #footer="{ close }">
      <div class="grid grid-cols-2 gap-4 w-full">
        <UButton variant="ghost" block @click="close">Annuler</UButton>
        <UButton
          :disabled="!newNote"
          block
          :loading
          @click="handleAddNote(close)"
          >Confirmer</UButton
        >
      </div>
    </template>
  </UModal>
</template>
