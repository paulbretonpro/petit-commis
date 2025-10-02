import { serverSupabaseClient } from '#supabase/server'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams, getUser } from '~~/server/functions/check-params'
import { TableEnum } from '~~/shared/types/database-type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await getUser(event)

  const shoppingId = getRequiredUrlParams(event)

  const { data: shoppingList } = await client
    .from(TableEnum.SHOPPING_LIST)
    .select('id, created_at')
    .eq('id', shoppingId)
    .eq('user_id', user.id)
    .single()

  if (!shoppingList) {
    throw new Error('Unauthorized')
  }

  const { data } = await client
    .from(TableEnum.SHOPPING_LIST_INGREDIENTS)
    .select(
      'id, shopping_list_id, quantity, unit, ingredient:ingredients(*), ingredient_name, ingredient_id)'
    )
    .eq('shopping_list_id', shoppingId)
    .order('ingredient_name', { ascending: true })

  return useChangeCaseObject(data || [])
})
