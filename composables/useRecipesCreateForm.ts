import { z } from "zod"

export default function () {
  const schema = z.object({
    name: z.string(),
    description: z.string(),
    nbPersons: z.number().min(0).default(2),
    isPublic: z.boolean().default(false),
    categorie: z.number()
  })

  return {
    schema
  }  
}