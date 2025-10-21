import { serverSupabaseClient } from '#supabase/server'
import { z } from 'zod'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams, getUser } from '~~/server/functions/check-params'
import { TableEnum } from '~~/shared/types/database-type'

const schema = z.object({
  ingredientId: z.number().positive(),
  quantity: z.number().min(1),
  unit: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id de la recette dans l'url
  const recipeId = getRequiredUrlParams(event)

  // Récupération de l'utilisateur connecté
  const user = await getUser(event)

  // Vérification si la recette appartient à l'utilisateur connecté
  const { data: recipe } = await client
    .from(TableEnum.RECIPES)
    .select('*')
    .eq('owner_id', user.id)
    .eq('id', recipeId)
    .maybeSingle()

  if (recipe === null) {
    throw new Error('user unauthorized')
  }

  // Récupération du body
  const body = await readValidatedBody(event, schema.parse)
  if (!body) {
    throw new Error('payload invalid')
  }

  // Insertion des étapes
  const { data, status, error } = await client
    .from(TableEnum.INGREDIENTS_RECIPES)
    .insert({
      recipe_id: recipeId,
      ingredient_id: body.ingredientId,
      quantity: String(body.quantity),
      unit: body.unit as Database['public']['Enums']['IngredientUnit'],
    })
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return {
    data: useChangeCaseObject(data),
    status,
  }
})
