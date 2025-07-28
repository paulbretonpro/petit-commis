import { endOfMonth, getLocalTimeZone, today, type DateValue } from "@internationalized/date"
import type { RadioGroupItem } from "@nuxt/ui"
import type { IPlanning } from "~/server/api/planning/type"

export default function () {
  const toast = useToast()

  const loading = ref(true)
  const btnLoading = ref(false)

  const allUnavailableDate = ref<IPlanning[]>([])

  const selectDay = ref<{ date: DateValue | undefined, type: number | undefined }>({
    date: today(getLocalTimeZone()),
    type: undefined
  })

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

    if (!selectDay.value) return options

    const index = allUnavailableDate.value.findIndex(planning => planning.date === selectDay.value.date?.toString())

    if (index > -1) {
      options[allUnavailableDate.value[index].type].disabled = true
      options[allUnavailableDate.value[index].type].class = 'radio-disabled'
    }

    return options
  })

  const handleGetUnavailableDate = async () => {
    loading.value = true

    allUnavailableDate.value = await $fetch<IPlanning[]>('/api/planning', {
      method: 'GET',
      params: {
        date_start: today(getLocalTimeZone()).toString(),
        date_end: endOfMonth(today(getLocalTimeZone())).toString(),
      }
    })

    loading.value = false
  }

  const handleAddRecipeToPlanning = async (recipeId: number, close: () => void) => {
    btnLoading.value = true
    
    try {
      await $fetch('/api/planning/recipe', {
        method: 'POST',
        body: {
          date: selectDay.value.date?.toString(),
          recipeId: recipeId,
          type: selectDay.value.type,
        }
      })

      toast.add({
        title: 'Succès',
        description: 'Recette ajoutée au planning',
        color: 'success'
      })

      close()
    } catch {
      toast.add({
        title: 'Echec',
        description: 'Impossible d\'ajoute la recette au planning',
        color: 'error'
      })
    } finally {
      btnLoading.value = false
    }
  }

  const handleReset = () => {
    selectDay.value.date = today(getLocalTimeZone())
    selectDay.value.type = undefined
  }

  const getUnvailableDate = (date: DateValue) => {
    return allUnavailableDate.value.filter(planning => planning.date === date.toString()).length === 2
  }
  return {
    btnLoading,
    getUnvailableDate,
    handleAddRecipeToPlanning,
    handleGetUnavailableDate,
    handleReset,
    loading,
    radioGroupItems,
    selectDay
  }
}
