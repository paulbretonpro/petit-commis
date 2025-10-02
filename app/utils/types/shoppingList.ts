import type { IIngredient } from '~/server/api/ingredients/type'

export interface IShoppingListItem {
  id: number
  ingredient: IIngredient
  ingredientId?: number
  ingredientName?: string
  quantity: string
  shoppingListId: number
  unit: string
}
