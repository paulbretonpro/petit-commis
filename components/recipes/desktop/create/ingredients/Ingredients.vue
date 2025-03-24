<script setup lang="ts">
import { cn } from '~/lib/utils'
import { Check, Search } from 'lucide-vue-next'
import type { IIngredient } from '~/server/api/ingredients/type'
import { Icon } from '@iconify/vue'
import type { IRecipe } from '~/server/api/recipes/type'
import { toast } from '~/components/ui/toast'

interface IIngredientRecipe {
  id?: number
  ingredient?: IIngredient
  quantity?: number
  unit?: string
}

const props = defineProps<{
  recipe?: IRecipe
}>()

const emit = defineEmits<{
  'has-ingredient': [value: boolean]
}>()

const loadingBtn = ref(false)

const { data } = await useFetch<IIngredient[]>('/api/ingredients', {
  key: 'ingredients'
})

const newIngredient = ref<IIngredientRecipe>({
  ingredient: undefined,
  quantity: undefined,
  unit: undefined,
})

const ingredientList = ref<IIngredientRecipe[]>([])

const resetForm = () => {
  newIngredient.value = {
    ingredient: undefined,
    quantity: undefined,
    unit: undefined
  }
}

const handleAddIngredientInRecipe = async () => {
  loadingBtn.value = true
  try {
    await $fetch(`/api/recipes/${props.recipe?.id}/ingredients`, {
      method: 'POST',
      body: {
        quantity: newIngredient.value.quantity,
        ingredientId: newIngredient.value.ingredient?.id,
        unit: newIngredient.value.unit
      }
    })
  
    ingredientList.value.push(newIngredient.value)

    resetForm()
  } catch {
    toast({
      title: 'Erreur',
      description: 'Une erreur est survenue durant l\'ajout de l\'ingredient à la recette',
      variant: 'destructive'
    })
  } finally {
    loadingBtn.value = false
  }
}

const handleRemoveIngredient = async (index: number, ingredientId: number) => {
  try {
    await $fetch(`/api/recipes/${props.recipe?.id}/ingredients/${ingredientId}`, {
      method: 'DELETE',
    })
  
    ingredientList.value.splice(index, 1)
  } catch {
    toast({
      title: 'Erreur',
      description: 'Une erreur est survenue durant la suppression de l\'ingredient',
      variant: 'destructive'
    })
  }
}

watchEffect(() => {
  emit("has-ingredient",  ingredientList.value.length > 0)
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Ajouter vos ingrédients</CardTitle>
      <CardDescription>Pour chaque ingrédient, il faut préciser la quantité et l'unité</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <!-- Ingrédient -->
        <Combobox v-model="newIngredient.ingredient" by="name">
          <ComboboxAnchor as-child>
            <ComboboxTrigger as-child>
              <Button variant="outline" class="w-full justify-between">
                {{ newIngredient.ingredient?.name ?? 'Sélectionner un ingrédient' }}
                <Icon icon="radix-icons:caret-sort" width="15" height="15" />
              </Button>
            </ComboboxTrigger>
          </ComboboxAnchor>

          <ComboboxList>
            <div class="relative w-full max-w-sm items-center">
              <ComboboxInput class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10" placeholder="Sélectionner un ingrédient..." />
              <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                <Search class="size-4 text-muted-foreground" />
              </span>
            </div>

            <ComboboxEmpty>
              No framework found.
            </ComboboxEmpty>

            <ComboboxGroup>
              <ComboboxItem
                v-for="ingredient in data"
                :key="ingredient.id"
                :value="ingredient"
              >
                {{ ingredient.name }}

                <ComboboxItemIndicator>
                  <Check :class="cn('ml-auto h-4 w-4')" />
                </ComboboxItemIndicator>
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </Combobox>

        <!-- Quantité -->
         <RecipesDesktopCreateIngredientsQuantity v-model="newIngredient.quantity" />

        <!-- Unité -->
        <RecipesDesktopCreateIngredientsUnity v-model="newIngredient.unit" />
      </div>
      <div class="flex justify-end" @click="handleAddIngredientInRecipe">
        <Button :loading="loadingBtn">
          <Icon icon="radix-icons:plus" />
          Ajouter
        </Button>
      </div>
    </CardContent>
  </Card>

  <div class="grid grid-cols-3 gap-4">
    <div v-for="(ingredient, index) in ingredientList" :key="index" class="border rounded-lg p-4 flex justify-between items-center">
      <div class="flex flex-col">
        <div class="font-medium">{{ ingredient.ingredient?.name }}</div>
        <div class="text-gray-400 font-medium">{{ `${ingredient.quantity} ${ingredient.unit}` }}</div>
      </div>
      <Button variant="ghost" class="text-red-500" @click="handleRemoveIngredient(index, ingredient.ingredient?.id ?? 0)"><Icon icon="radix-icons:trash" width="15" height="15" /></Button>
    </div>
  </div>
  
</template>