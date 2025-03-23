<script setup lang="ts">
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'

import { BookUser, Check, CreditCard, Truck } from 'lucide-vue-next'

const steps = [{
  step: 1,
  title: 'Recette',
  description: 'Ajouter les détails de votre recette',
  icon: BookUser,
},
{
  step: 2,
  title: 'Ingrédients',
  description: 'Sélectionner vos ingrédients',
  icon: Truck,
},
{
  step: 3,
  title: 'Finalisation',
  description: 'Visualisation de votre recette ',
  icon: Check,
}]

const step = ref(1)
</script>

<template>
  <div class="flex flex-col gap-6">
    <Stepper v-model="step" class="grid grid-cols-3 mx-auto">
      <StepperItem
        v-for="item in steps"
        :key="item.step"
        class="basis-1/4"
        :step="item.step"
      >
        <StepperTrigger>
          <StepperIndicator>
            <component :is="item.icon" class="w-4 h-4" />
          </StepperIndicator>
          <div class="flex flex-col">
            <StepperTitle>
              {{ item.title }}
            </StepperTitle>
            <StepperDescription>
              {{ item.description }}
            </StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator
          v-if="item.step !== steps[steps.length - 1].step"
          class="w-full h-px"
        />
      </StepperItem>
    </Stepper>

    <RecipesCreateDesktop />

  </div>
</template>