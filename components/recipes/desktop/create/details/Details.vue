<script setup lang='ts'>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'
import type { IRecipe } from '~/server/api/recipes/type'

const props = defineProps<{
  recipe?: IRecipe
}>()

const emit = defineEmits<{
  recipeIsCreated: [recipe: IRecipe]
}>()

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { toast } = useToast()

const { categories } = await useCategories()
const { schema } = useRecipesCreateForm()

const formSchema = toTypedSchema(schema)

const { handleReset, handleSubmit, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    ...props.recipe,
    categorie: props.recipe?.categoryId
  }
})

const handleCanceled = () => {
  // TODO: supprimer la recette
  toast({
    title: 'Supprimer',
    description: 'Supprimer la recette'
  })

  handleReset()
}

const onSubmit = handleSubmit(async (values) => {
  try {
    // uploader l’image si fichier sélectionné
    const { data } = await $fetch<{ data: IRecipe }>('/api/recipes', {
      method: 'POST',
      body: values
    })

    emit('recipeIsCreated', data)
  } catch {
    toast({
      title: 'Échec',
      description: 'La création de votre recette a échoué',
      variant: 'destructive'
    })
  }
})

const postImage = async (image: File, setValue: (value: string) => void) => {
  const { data } = await supabase.storage
    .from('recipe-images')
    .upload(`${user.value?.id}/${values.name}`, image, {
      upsert: true
    })

  if(data) {
    setValue(data.id)
  }
}
</script>

<template>
  <Card class="w-[350px] mx-auto">
    <CardHeader>
      <CardTitle>Créer votre recette</CardTitle>
      <CardDescription>Décrivez votre recette.</CardDescription>
    </CardHeader>
    <CardContent>
      <form
        keep-values
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
              <Input type="text" placeholder="Ex: Un délicieux plat de pâte italien" v-bind="componentField" />
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

        <FormField v-slot="{ setValue, field, componentField }" name="imageId">
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" @change="async (e) => postImage(e.target.files[0], setValue)" />
            </FormControl>
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
          <Button variant="outline" class="w-full" type="reset" @click="handleCanceled">
            Annuler
          </Button>
          <Button class="w-full" type="submit">{{ !!recipe ? 'Modifier' : 'Ajouter' }}</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>