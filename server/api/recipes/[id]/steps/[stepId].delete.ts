import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams, getUser } from '~~/server/functions/check-params'
import { TableEnum } from '~~/shared/types/database-type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id de la recette dans l'url
  const recipeId = getRequiredUrlParams(event)

  // Récupération de l'id du step dans l'url
  const stepId = getRequiredUrlParams(event, {
    search: 'stepId',
    name: 'step',
  })

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

  // Insertion des étapes
  const { status, error } = await client
    .from(TableEnum.STEPS_RECIPES)
    .delete()
    .eq('id', stepId)

  if (error) {
    throw error
  }

  return {
    status,
  }
})
