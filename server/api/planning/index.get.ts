import { serverSupabaseClient } from '#supabase/server'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import type { Database } from "~/database.types"
import { getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await getUser(event)

  const params = getQuery<{ date_start: string, date_end: string }>(event)

  if (!params.date_end || !params.date_end) {
    throw new Error('Missing params date start or date end')
  }
  const { data } = await client
    .from(TableEnum.PLANNING)
    .select('*')
    .eq('user_id', user.id)
    .gte('date', params.date_start)
    .lte('date', params.date_end)
    
  return useChangeCaseObject(data || [])
})
