import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams } from '~~/server/functions/check-params'
import { TableEnum } from '~~/shared/types/database-type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id de la liste de courses dans l'url
  const shoppingListItemId = getRequiredUrlParams(event, { search: 'itemId' })
  const { status, error } = await client
    .from(TableEnum.SHOPPING_LIST_INGREDIENTS)
    .delete()
    .eq('id', shoppingListItemId)

  if (error) {
    throw error
  }

  return {
    status,
  }
})
