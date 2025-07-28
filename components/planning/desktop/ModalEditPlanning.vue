<script setup lang="ts">
import type { IPlanning } from '~/server/api/planning/type'

const open = defineModel<boolean>({ required: true })

defineProps<{
  recipes: { lunch: IPlanning | undefined, dinner: IPlanning | undefined } | undefined
}>()

const emit = defineEmits<{
  'planned-recipe-has-deleted': []
}>()
</script>

<template>
  <UModal v-model:open="open" title="Modifier">
    <template #body>
      <div class="flex flex-col gap-4">
        <PlanningDesktopCardRecipeDay :planning="recipes?.lunch" @planned-recipe-has-deleted="emit('planned-recipe-has-deleted')" />

        <PlanningDesktopCardRecipeDay :planning="recipes?.dinner" @planned-recipe-has-deleted="emit('planned-recipe-has-deleted')" />
      </div>
    </template>
  </UModal>
</template>