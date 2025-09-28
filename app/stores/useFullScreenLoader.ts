import { defineStore } from 'pinia'

export default defineStore('fullScreenLoader', () => {
  const isLoading = ref(false)
  const message = ref<string>()

  const show = (newMessage?: string) => {
    isLoading.value = true
    message.value = newMessage
  }

  const hide = () => {
    isLoading.value = false
    message.value = undefined
  }

  return { isLoading, message, show, hide }
})
