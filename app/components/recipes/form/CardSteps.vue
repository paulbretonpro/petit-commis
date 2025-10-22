<script setup lang="ts">
defineProps<{
  steps: { id?: number; step: string }[]
}>()

const emit = defineEmits<{
  'add-step': [step: string]
  'delete-step': [index: number]
}>()

const newStep = ref<string>()

const handleAddNewStep = () => {
  if (newStep.value?.trim().length) {
    emit('add-step', newStep.value)
    newStep.value = undefined
  }
}

const handleDeleteStep = (index: number) => {
  emit('delete-step', index)
}
</script>

<template>
  <SharedCardCollapsible :title="`Étapes (${steps.length})`">
    <template #content>
      <div class="flex flex-col gap-4">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex items-center gap-4"
        >
          <div class="flex flex-col gap-2 grow">
            <UBadge
              variant="subtle"
              :label="`Etape ${index + 1}`"
              class="h-fit w-fit"
            />
            <div class="text-gray-500">{{ step.step }}</div>
          </div>
          <UButton
            icon="material-symbols:delete-outline-rounded"
            color="error"
            variant="subtle"
            @click="handleDeleteStep(index)"
          />
        </div>

        <div class="flex flex-col md:flex-row gap-2">
          <UBadge
            variant="subtle"
            :label="`Etape ${steps.length + 1}`"
            class="h-fit w-fit"
          />
          <UTextarea
            v-model="newStep"
            class="grow"
            @keydown.enter.prevent="handleAddNewStep"
          />
        </div>

        <UButton
          size="sm"
          variant="subtle"
          icon="material-symbols:add-rounded"
          class="w-fit mx-auto"
          @click="handleAddNewStep"
        >
          Ajouter une étape
        </UButton>
      </div>
    </template>
  </SharedCardCollapsible>
</template>
