<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { NumberField } from '~/components/ui/number-field'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()

const { categories } = await useCategories()
const { schema } = useRecipesCreateForm()

const formSchema = toTypedSchema(schema)

const { handleReset, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch('/api/recipes', { method: 'POST', body: values })
  } catch {
    toast({
      title: 'Échec',
      description: 'la création de votre recette a échoué',
      variant: 'destructive'
    })
  }
})
</script>

<template>
  <Card class="w-[350px] mx-auto">
    <CardHeader>
      <CardTitle>Créer votre recette</CardTitle>
      <CardDescription>Décrivez votre recette pas à pas.</CardDescription>
    </CardHeader>
    <CardContent>
      <form
        class="space-y-4"
        @submit="onSubmit"
      >
        <FormField v-slot="{ componentField }"  name="name">
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input type="text" required placeholder="Ex: Pâte pesto" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Ex: Pâte pesto" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="categorie">
          <FormItem>
            <FormLabel>Catégorie</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Ex: petit-déjeuner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="nbPersons">
          <FormItem>
            <FormLabel>Nombre de personnes</FormLabel>
              <NumberField 
                v-bind="componentField"
                :model-value="parseInt(componentField.modelValue)"
                required
                placeholder="Ex: Pâte pesto"
                :min="0"
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <FormControl>
                    <NumberFieldInput />
                  </FormControl>
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" type="checkbox" name="mobile">
          <FormItem class="flex gap-2 items-center">
            <FormControl>
              <Checkbox v-bind="componentField" />
            </FormControl>
            <FormLabel>Voulez-vous partager votre recette à la communauté ?</FormLabel>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-between gap-4 pt-4">
          <Button variant="outline" class="w-full" @click="handleReset">
            Annuler
          </Button>
          <Button class="w-full" type="submit">Ajouter</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>