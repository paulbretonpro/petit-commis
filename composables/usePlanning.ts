import type { DateValue } from "@internationalized/date"

export default function () {
  const toast = useToast()

  const loading = ref(true)
  const btnLoading = ref(false)

  const selectDay = ref<{ date: DateValue, type: number | undefined }>({
    date: today(),
    type: undefined
  })

  const handleAddRecipeToPlanning = async (recipeId: number, close: () => void) => {
    btnLoading.value = true
    
    try {
      await $fetch('/api/planning', {
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
    selectDay.value.date = today()
    selectDay.value.type = undefined
  }

  const handleNextMonth = () => {
    selectDay.value.date = (selectDay.value.date ?? today()).add({ months: 1 })
  }

  const handlePrevMonth = () => {
    selectDay.value.date = (selectDay.value.date ?? today()).subtract({ months: 1 })
  }
  
  return {
    btnLoading,
    handleAddRecipeToPlanning,
    handleNextMonth,
    handlePrevMonth,
    handleReset,
    loading,
    selectDay,
  }
}
