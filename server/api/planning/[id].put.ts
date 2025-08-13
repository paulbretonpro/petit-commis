import { serverSupabaseClient } from '#supabase/server'
import z from 'zod'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams, getUser } from '~~/server/functions/check-params'
import { TableEnum } from '~~/shared/types/database-type'

const BodySchema = z.object({
  note: z.string(),
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id du planning
  const planningId = getRequiredUrlParams(event)

  // Récupération de l'utilisateur connecté
  const user = await getUser(event)

  const body = await readValidatedBody(event, BodySchema.parse)

  // Vérification si la recette dans le planning appartient à l'utilisateur connecté
  const { error } = await client
    .from(TableEnum.PLANNING)
    .update({
      note: body.note,
    })
    .eq('id', planningId)
    .eq('user_id', user.id)

  if (error) {
    throw error
  }

  return {
    status: 'success',
  }
})
