<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Check, Circle } from 'lucide-vue-next'
import ConfettiExplosion from "vue-confetti-explosion"
import { toast } from '~/components/ui/toast'
import type { IRecipe } from '~/server/api/recipes/type'

const props = defineProps<{
  recipe?: IRecipe
}>()

const steps = ref<string[]>([])

const newStep = ref<string>('')
const isFinish = ref(false)

const currentIndex = computed(() => steps.value.length)
const handleAddStep = () => {
  if (newStep.value.trim().length) {
    steps.value.push(newStep.value.trim())
  }

  newStep.value = ''
}

const handleDeleteStep = (index: number) => steps.value.splice(index, 1)

const handleSendSteps = async () => {
  isFinish.value = true
  
  try {
    if (steps.value.length) {
      await $fetch(`/api/recipes/${props.recipe?.id}/steps`, {
        method: 'POST',
        body: {
          steps: steps.value
        }
      })
    }

    setTimeout(() => {
      navigateTo('/')
    }, 2000)
  } catch {
    toast({ title: 'Échec', variant: 'destructive' })
  }
}
</script>

<template>
  <Card class="mx-auto">
    <CardHeader>
      <CardTitle>Lister les Étapes</CardTitle>
      <CardDescription>Ajouter les étapes pour préparer votre recette.</CardDescription>
    </CardHeader>

    <CardContent>
      <Stepper :model-value="currentIndex" orientation="vertical" class="mx-auto flex w-full max-w-md flex-col justify-start gap-10">
        <StepperItem
          v-for="(step, index) in steps"
          :key="index"
          class="relative flex w-full items-start gap-6"
          :step="index + 1"
        >
          <StepperSeparator
            class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />

          <StepperTrigger as-child>
            <Button
              variant="default"
              size="icon"
              class="z-10 rounded-full shrink-0"
            >
              <Check class="size-5" />
            </Button>
          </StepperTrigger>

          <div class="flex flex-col gap-1 grow">
            <StepperTitle
              class="text-sm font-semibold transition lg:text-base flex justify-between"
            >
              <div>{{ `Étape ${index + 1}` }}</div>
              <Button variant="ghost" class="text-red-500" @click="handleDeleteStep(index)"><Icon icon="radix-icons:trash" width="15" height="15" /></Button>
            </StepperTitle>
            <StepperDescription
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              {{ step }}
            </StepperDescription>
          </div>
        </StepperItem>

        <!-- Ajouter une nouvelle étape -->
        <StepperItem
          class="relative flex w-full items-start gap-6"
          :step="steps.length"
        >
          <StepperTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="z-10 rounded-full shrink-0"
            >
              <Circle />
            </Button>
          </StepperTrigger>

          <div class="flex flex-col gap-1 grow">
            <StepperTitle
              class="text-sm font-semibold transition lg:text-base"
            >
              Ajouter une étape
            </StepperTitle>
            <div class="grow flex gap-2 items-center">
              <Textarea v-model="newStep" placeholder="Décrivez l'étape suivante" class="w-full" />
              <Button variant="secondary" @click="handleAddStep">Ajouter</Button>
            </div>
          </div>
        </StepperItem>
      </Stepper>
    </CardContent>

    <CardFooter>
      <Button class="w-full" @click="handleSendSteps">Terminer</Button>
      <ConfettiExplosion v-if="isFinish" />
    </CardFooter>
  </Card>
</template>