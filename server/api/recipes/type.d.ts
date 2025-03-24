import type { ICategory } from "../categories/type"

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