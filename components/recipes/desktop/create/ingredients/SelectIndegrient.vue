<script setup lang="ts">
import { cn } from '~/lib/utils'
import { Check, Search } from 'lucide-vue-next'
import type { IIngredient } from '~/server/api/ingredients/type'
import { Icon } from '@iconify/vue'

const ingredient = defineModel<IIngredient | undefined>({ required: true })

const { data } = await useLazyAsyncData<IIngredient[]>('ingredients', async () => $fetch('/api/ingredients'))
</script>

<template>
  <!-- Ingrédient -->
  <Combobox v-model="ingredient" by="name">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="w-full justify-between" :class=" {'text-muted-foreground font-normal': !ingredient?.name, 'font-normal': ingredient?.name }">
          {{ ingredient?.name ?? 'Sélectionner un ingrédient' }}
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
          v-for="food in data"
          :key="food.id"
          :value="food"
        >
          {{ food.name }}
          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>