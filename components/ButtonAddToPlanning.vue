<script setup lang="ts">
import { endOfMonth, startOfMonth, type DateValue } from '@internationalized/date'
import type { RadioGroupItem } from '@nuxt/ui'
import type { IPlanning } from '~/server/api/planning/type'

withDefaults(
  defineProps<{
    recipeId: number
    withoutLabel?: boolean
  }>(),
  {
    withoutLabel: false
  }
)

const {
  btnLoading,
  handleAddRecipeToPlanning,
  handleNextMonth,
  handlePrevMonth,
  handleReset,
  selectDay
} = usePlanning()

const allUnavailableDate = ref<IPlanning[]>([])

const isUnAvailableDate = computed(() => getUnvailableDate(selectDay.value.date))

const disabledOption = (option: RadioGroupItem) => {
  if (!option) return 
  option.disabled = true
  option.class = 'radio-disabled'
}

const radioGroupItems = computed<RadioGroupItem[]>(() => {
  const options: RadioGroupItem[] = [
    {
      disabled: false,
      label: 'Midi',
      value: 0,
    },
    {
      disabled: false,
      label: 'Soir',
      value: 1,
    }
  ]

  if (!selectDay.value.date) return options

  if (isUnAvailableDate.value) {
    disabledOption(options[0])
    disabledOption(options[1])
  }

  const index = allUnavailableDate.value.findIndex(planning => planning.date === selectDay.value.date?.toString())

  if (index > -1) {
    disabledOption(options[allUnavailableDate.value[index].type])
  }

  return options
})

const fetchPlanning = async (newDate: DateValue) => {
  const response = await $fetch<IPlanning[]>('/api/planning', {
    method: 'GET',
    params: {
      date_start: startOfMonth(newDate).toString(),
      date_end: endOfMonth(newDate).toString(),
    },
  })

  if (response) {
    allUnavailableDate.value = response
  }
}

const getUnvailableDate = (date: DateValue) => {
  return allUnavailableDate.value.filter(planning => planning.date === date.toString()).length === 2
}

watch(() => selectDay.value.date, (newDate, oldDate) => {
  selectDay.value.type = undefined
  
  if(!isSameMonth(oldDate, newDate)) {
    fetchPlanning(newDate)
  }
})
</script>

<template>
  <UModal title="Ajouter au planning" @update:open="handleReset">
    <ClientOnly>
      <UButton 
        :label="withoutLabel ? undefined : 'Ajouter au menu'"
        variant="subtle"
        icon="material-symbols:calendar-add-on-outline-rounded"
        block
        @click.prevent="() => fetchPlanning(today())"
      />
    </ClientOnly>
    <template #body>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <UCalendar
            v-model="selectDay.date"
            :min-value="today()"
            :year-controls="false"
            :month-controls="false"
            initial-focus
            :is-date-unavailable="getUnvailableDate"
          />
          <div class="flex justify-between gap-4">
            <UButton color="neutral" variant="outline" icon="material-symbols:arrow-left-alt-rounded" @click="handlePrevMonth">
              Précédent
            </UButton>

            <UButton color="neutral" variant="outline" trailing-icon="material-symbols:arrow-right-alt-rounded" @click="handleNextMonth">
              Suivant
            </UButton>
          </div>
        </div>

        <URadioGroup v-model="selectDay.type" label indicator="start" variant="card" :items="radioGroupItems" />
      </div>
    </template>

    <template #footer="{ close }">
      <div class="grid grid-cols-2 gap-4 w-full">
        <UButton variant="ghost" block @click="close">Annuler</UButton>
        <UButton :disabled="isUnAvailableDate" block :loading="btnLoading" @click="handleAddRecipeToPlanning(recipeId, close)">Confirmer</UButton>
      </div>
    </template>
  </UModal>
</template>