<script setup lang="ts">
import { Check, BookOpenText, Carrot, List } from 'lucide-vue-next'
import type { IRecipe } from '~/server/api/recipes/type'

const stepIndex = ref(1)
const steps = [{
  step: 1,
  title: 'Recette',
  description: 'Ajouter les détails de votre recette',
  icon: BookOpenText,
},
{
  step: 2,
  title: 'Ingrédients',
  description: 'Sélectionner vos ingrédients',
  icon: Carrot,
},
{
  step: 3,
  title: 'Étapes',
  description: 'Ajouter les étapes de votre recette ',
  icon: List,
}]

const recipe = ref<IRecipe>()
const hasIngredient = ref(false)

const isActive = (step: number) => {
  if (step === 1) {
    return true
  } else if (step === 2) {
    return !!recipe.value
  } else if (step === 3) {
    return hasIngredient.value
  }
}

const handleRecipeIsCreated = (newRecipe: IRecipe) => {
  recipe.value = newRecipe
  stepIndex.value++
}

const handleHasIngredient = (value: boolean) => hasIngredient.value = value
</script>

<template>
  <Stepper v-model="stepIndex" class="block w-full">
    <div class="flex w-full flex-start gap-2">
      <StepperItem
        v-for="item in steps"
        :key="item.step"
        v-slot="{ state }"
        class="relative flex w-full flex-col items-center justify-center"
        :step="item.step"
      >
        <StepperSeparator
          v-if="item.step !== steps[steps.length - 1].step"
          class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
        />

        <StepperTrigger as-child>
          <Button
            :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
            size="icon"
            class="z-10 rounded-full shrink-0"
            :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
            :disabled="state !== 'completed' && !isActive(item.step)"
          >
            <Check v-if="state === 'completed'" class="size-5" />
            <component :is="item.icon" v-else class="w-4 h-4" />
          </Button>
        </StepperTrigger>

        <div class="mt-5 flex flex-col items-center text-center">
          <StepperTitle
            :class="[state === 'active' && 'text-primary']"
            class="text-sm font-semibold transition lg:text-base"
          >
            {{ item.title }}
          </StepperTitle>
          <StepperDescription
            :class="[state === 'active' && 'text-primary']"
            class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
          >
            {{ item.description }}
          </StepperDescription>
        </div>
      </StepperItem>
    </div>

    <div class="flex flex-col gap-4 mt-4">
      <template v-if="stepIndex === 1">
        <RecipesDesktopCreateDetails :recipe @recipe-is-created="handleRecipeIsCreated" />
      </template>

      <template v-if="stepIndex === 2">
        <RecipesDesktopCreateIngredients :recipe @has-ingredient="handleHasIngredient" />
      </template>

      <template v-if="stepIndex === 3">
        <RecipesDesktopCreateSteps :recipe />
      </template>
    </div>
  </Stepper>
</template>