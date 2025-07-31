<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import type { IPlanning } from '~/server/api/planning/type'

const open = defineModel<boolean>({ required: true })

defineProps<{
  day: CalendarDate
  recipes:
    | { lunch: IPlanning | undefined; dinner: IPlanning | undefined }
    | undefined
}>()

const emit = defineEmits<{
  'planning-has-updated': []
}>()

enum PlanningTypeEnum {
  LUNCH,
  DINNER,
}
</script>

<template>
  <UModal v-model:open="open" title="Modifier">
    <template #body>
      <div class="flex flex-col gap-4">
        <PlanningCardRecipeDay
          :type="PlanningTypeEnum.LUNCH"
          :day
          :planning="recipes?.lunch"
          @planning-has-updated="emit('planning-has-updated')"
        />

        <PlanningCardRecipeDay
          :type="PlanningTypeEnum.DINNER"
          :day
          :planning="recipes?.dinner"
          @planning-has-updated="emit('planning-has-updated')"
        />
      </div>
    </template>
  </UModal>
</template>
