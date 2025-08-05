import { defineStore } from 'pinia'
import type { IShoppingListItem } from '~/utils/types/shoppingList'

export const useShoppingListItemStore = defineStore(
  'shopping-list-item',
  () => {
    const items = ref<IShoppingListItem[]>([])

    const fetchShoppingListItem = async (shoppingListId: number) => {
      items.value = await $fetch<IShoppingListItem[]>(
        `/api/shopping-list/${shoppingListId}`
      )
    }

    return {
      fetchShoppingListItem,
      items,
    }
  }
)
