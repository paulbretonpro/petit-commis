<script setup lang="ts">
import * as z from 'zod'
import { Icon } from '@iconify/vue'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'login'
})

const toast = useToast()
const { auth } = useSupabaseClient()

const loading = ref(false)
const userCredentials = ref({
  email: undefined,
  password: undefined
})

const schema = z.object({
  email: z
    .string({
      required_error: 'Champ requis.',
    }),
  password: z
    .string({
      required_error: 'Champ requis.',
    })
})


const onSubmit = async (event: FormSubmitEvent<z.output<typeof schema>>) => {
  loading.value = true
  
  const user = await auth.signInWithPassword({
    ...event.data,
  })
  loading.value = false

  if (user.error) {
    toast.add({
      title: 'Échec',
      description: 'Votre email ou votre mot de passe est incorrect',
      color: 'error'
    })
  } else {
    navigateTo('/')
  }
}
</script>

<template>
  <div class="flex flex-col gap-16 grow">
    <div class="text-center text-4xl font-extrabold">PETIT COMMIS</div>
    <UForm :schema :state="userCredentials" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="userCredentials.email" type="email" placeholder="jean.dupont@gmail.com" class="w-full" />
      </UFormField>
      <UFormField label="Password" name="password">
        <UInput v-model="userCredentials.password" type="password" placeholder="••••••••" class="w-full" />
      </UFormField>
      <UButton :disabled="loading" :loading type="submit" block>
        <template v-if="loading">
          Connexion ...
        </template>
        <template v-else>
          <Icon icon="radix-icons:lock-open-1" />
          Se connecter
        </template>
      </UButton>
    </UForm>
  </div>
</template>