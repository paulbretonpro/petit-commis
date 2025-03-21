<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import * as z from 'zod'
import { useToast } from '~/components/ui/toast'
import { Icon } from '@iconify/vue'

definePageMeta({
  layout: 'login'
})

const { toast } = useToast()
const { auth } = useSupabaseClient()

const loading = ref(false)

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

const onSubmit = async (form: { email: string, password: string }) => {
  loading.value = true
  
  const user = await auth.signInWithPassword({
    ...form,
  })
  loading.value = false

  if (user.error) {
    toast({
      title: 'Échec',
      description: 'Votre email ou votre mot de passe est incorrect',
    })
  } else {
    navigateTo('/')
  }
}
</script>

<template>
  <div class="flex flex-col gap-16 grow">
    <div class="text-center text-4xl font-extrabold">PETIT COMMIS</div>
    <AutoForm
      class="space-y-6"
      :schema="schema"
      :field-config="{
        email: {
          label: 'Email',
          inputProps: {
            type: 'email',
            placeholder: 'jean.dupont@gmail.com'
          }
        },
        password: {
          label: 'Mot de passe',
          inputProps: {
            type: 'password',
            placeholder: '••••••••',
          },
        },
      }"
      @submit="onSubmit"
    >
      <Button :disabled="loading" :loading type="submit" size="icon" class="w-full">
        <template v-if="loading">
          Connexion ...
        </template>
        <template v-else>
          <Icon icon="radix-icons:lock-open-1" />
          Se connecter
        </template>
      </Button>
    </AutoForm>
  </div>
</template>