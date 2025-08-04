<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { IShoppingListItem } from '~/utils/types/shoppingList'

const props = defineProps<{
  ingredient: IShoppingListItem
}>()

const route = useRoute()

const open = ref(false)
const isCheck = ref(false)

const options = ref<DropdownMenuItem[]>([
  {
    label: 'Éditer',
    icon: 'material-symbols:edit-square-outline-rounded',
    onSelect: () => (open.value = true),
  },
  {
    label: 'Supprimer',
    color: 'error',
    icon: 'material-symbols:delete-outline-rounded',
    onSelect: () =>
      $fetch(
        `/api/shopping-list/${route.params.id}/item/${props.ingredient.id}`,
        {
          method: 'DELETE',
        }
      ),
  },
])
</script>

<template>
  <div class="p-4 flex gap-4 items-center">
    <UCheckbox v-model="isCheck" size="xl">
      <template #label>
        <div :class="{ 'line-through opacity-30': isCheck }">
          {{ Number(ingredient.quantity) }}{{ ingredient.unit }}
          <span class="font-semibold">{{ ingredient.ingredient.name }}</span>
        </div>
      </template>
    </UCheckbox>

    <UDropdownMenu
      :items="options"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8,
      }"
      :ui="{
        content: 'w-48',
      }"
    >
      <UButton
        class="ml-auto"
        icon="mdi:dots-vertical"
        variant="ghost"
        color="neutral"
      />
    </UDropdownMenu>
  </div>

  <LazyShoppingListDesktopModalEdit v-model="open" :ingredient="ingredient" />
</template>
