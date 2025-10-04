<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'empty',
})

const toast = useToast()
const { auth } = useSupabaseClient()

const { isMobile } = useDevice()

const loading = ref(false)

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'jean.dupont@gmail.com',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    required: true,
  },
]

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    disabled: true,
    onClick: () => {
      toast.add({ title: 'Google', description: 'Login with Google' })
    },
  },
]

const schema = z.object({
  email: z.string({
    required_error: 'Champ requis.',
  }),
  password: z.string({
    required_error: 'Champ requis.',
  }),
})

type Schema = z.output<typeof schema>

const onSubmit = async (payload: FormSubmitEvent<Schema>) => {
  loading.value = true

  const user = await auth.signInWithPassword({
    ...payload.data,
  })

  loading.value = false

  if (user.error) {
    toast.add({
      title: 'Échec',
      description: 'Votre email ou votre mot de passe est incorrect',
      color: 'error',
    })
  } else {
    navigateTo('/')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 md:p-4 h-full">
    <UPageCard class="w-full max-w-md" :variant="isMobile ? 'outline' : 'soft'">
      <UAuthForm
        title="Petit commis"
        description="Entrez vos identifiants pour accéder à votre compte."
        icon="material-symbols:chef-hat-outline-rounded"
        :schema
        :fields
        :providers
        :submit="{
          label: loading ? 'Connexion ...' : 'Se connecter',
          icon: loading
            ? undefined
            : 'material-symbols:lock-open-outline-rounded',
        }"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
