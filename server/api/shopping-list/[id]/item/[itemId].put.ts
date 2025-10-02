import { serverSupabaseClient } from '#supabase/server'
import z from 'zod'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams } from '~~/server/functions/check-params'
import { TableEnum } from '~~/shared/types/database-type'

const BodySchema = z.object({
  quantity: z.string(),
  unit: z.string().nullable(),
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id de la liste de courses dans l'url
  const shoppingListItemId = getRequiredUrlParams(event, { search: 'itemId' })
  const body = await readValidatedBody(event, BodySchema.parse)

  const { status, error } = await client
    .from(TableEnum.SHOPPING_LIST_INGREDIENTS)
    .update({
      quantity: body.quantity,
      unit: body.unit,
    })
    .eq('id', shoppingListItemId)

  if (error) {
    throw error
  }

  return {
    status,
  }
})
