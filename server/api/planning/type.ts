import type { IRecipe } from "../recipes/type"

export interface IPlanning {
  date: string
  id: number
  recipeId: number
  type: number
  recipe?: IRecipe
}
