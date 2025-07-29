import type { IRecipe } from "../recipes/type"

export interface IPlanning {
  id: number
  date: string
  note?: string
  recipe?: IRecipe
  recipeId: number
  type: number
}
