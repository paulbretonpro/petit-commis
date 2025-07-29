import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/database.types'
import { getRequiredUrlParams, getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id du planning
  const planningId = getRequiredUrlParams(event)

  // Récupération de l'utilisateur connecté
  const user = await getUser(event)

  // Vérification si la recette dans le planning appartient à l'utilisateur connecté
  const { error } = await client
    .from(TableEnum.PLANNING)
    .delete()
    .eq('id', planningId)
    .eq('user_id', user.id)

  if (error) {
    throw error
  }

  return {
    status: 'success'
  }
})
