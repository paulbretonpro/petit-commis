import type { ICategory } from '../categories/type'

export interface IRecipe {
  id: number
  categoryId: number
  createdAt: string
  description: string
  hasImage: boolean
  isPublic: boolean
  name: string
  nbPersons: number

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

export type TRecipeWithIngredientSteps = IRecipe & {
  ingredients: IngredientQuantity[]
} & { steps: IStep[] }
