import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/database.types'
import { getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const user = await getUser(event)

  const { data } = await client
    .from(TableEnum.RECIPES)
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })
  
  return data
})
