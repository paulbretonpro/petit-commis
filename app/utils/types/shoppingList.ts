import type { IIngredient } from "~/server/api/ingredients/type"

export interface IShoppingListItem {
  id: number
  ingredientId?: number
  ingredientName?: string
  ingredient: IIngredient
  quantity: string
  unit: string
}