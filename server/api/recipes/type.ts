import type { ICategory } from '../categories/type'

export interface IRecipe {
  id: number
  categoryId: number
  createdAt: string
  description?: string
  name: string
  nbPersons: number
  hasImage: boolean

  category?: ICategory
}

interface IngredientQuantity {
  id: number
  name: string
  quantity: string
  unit: string
}

interface IStep {
  id: number
  step: string
}

export type TRecipeWithIngredientSteps = IRecipe & {
  ingredients: IngredientQuantity[]
} & { steps: IStep[] }
