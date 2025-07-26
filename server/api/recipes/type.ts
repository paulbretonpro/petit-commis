import type { ICategory } from "../categories/type"
import { z } from "zod"

export interface IRecipe {
  id: number
  name: string
  description: string
  categoryId: number
  nbPersons: number
  isPublic: boolean
  createdAt: string

  category?: ICategory
}


interface IngredientQuantity {
  id: number
  name: string
  quantity: string
  unit: string
}

interface IStep {
  step: string
}

export type TRecipeWithIngredientSteps = IRecipe & { ingredients: IngredientQuantity[] } & { steps: IStep[] }