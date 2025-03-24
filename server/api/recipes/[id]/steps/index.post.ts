import { serverSupabaseClient } from '#supabase/server'
import { z } from 'zod'
import type { Database } from '~/database.types'
import { getRequiredUrlParams, getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'

const schema = z.object({
  steps: z.string().array()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const recipeId = getRequiredUrlParams(event)

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
  const body = await readValidatedBody(event, schema.parse);
  if (!body) {
    throw new Error('payload invalid')
  }

  // Insertion des étapes
  const { status, error } = await client
    .from(TableEnum.STEPS_RECIPES)
    .insert(
      body.steps.map(step => ({
        step,
        recipe_id: recipeId
      }))
    )
    .select('*')

  if (error) {
    throw error
  }

  return {
    status
  }
})
