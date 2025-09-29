import z from 'zod'
import type { IIngredient } from '~~/server/api/ingredients/type'

export const RecipeFormCreateSchema = z.object({
  category: z.number(),
  description: z.string().optional().nullable(),
  hasImage: z.boolean(),
  ingredients: z.array(
    z.object({
      ingredientId: z.number(),
      quantity: z.number(),
      unit: z.string().optional().nullable(),
    })
  ),
  isPublic: z.boolean(),
  name: z.string(),
  nbPersons: z.number().min(0).max(100),
  steps: z.array(z.string()),
})

export type TRecipeFormCreate = {
  category: number | undefined
  description: string | undefined
  image: File | undefined
  ingredients: IIngredientQuatityForm[]
  isPublic: boolean
  name: string | undefined
  nbPersons: number
  steps: string[]
}

export interface IIngredientQuatityForm {
  ingredient: IIngredient | undefined
  quantity: number | undefined
  unit: string | undefined
}
