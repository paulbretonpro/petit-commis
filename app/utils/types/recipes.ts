import z from 'zod'
import type { IIngredient } from '~~/server/api/ingredients/type'

export const RecipeFormCreateSchema = z.object({
  category: z.number(),
  hasImage: z.boolean().default(false).optional(),
  description: z.string().optional().nullable(),
  ingredients: z.array(
    z.object({
      ingredientId: z.number(),
      quantity: z.number(),
      unit: z.string().optional().nullable(),
    })
  ),
  name: z.string(),
  nbPersons: z.number().min(0).max(100),
  steps: z.array(
    z.object({
      step: z.string(),
    })
  ),
})

export const RecipeFormEditSchema = z.object({
  category: z.number(),
  description: z.string().optional().nullable(),
  name: z.string(),
  nbPersons: z.number().min(0).max(100),
})

export type TRecipeFormCreate = {
  category: number | undefined
  description: string | undefined
  image: File | undefined
  ingredients: IIngredientQuatityForm[]
  name: string | undefined
  nbPersons: number
  steps: { id?: number; step: string }[]
}

export interface IIngredientQuatityForm {
  ingredient: IIngredient | undefined
  quantity: number | undefined
  unit: string | undefined
}
