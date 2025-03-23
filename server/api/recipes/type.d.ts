import type { ICategory } from "../categories/type"

export interface IRecipe {
  id: number,
  name: string,
  description: string,
  category: ICategory,
  nbPersons: number,
  isPublic: boolean,
  createdAt: string
}