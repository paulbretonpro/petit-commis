import { serverSupabaseClient } from '#supabase/server'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import type { Database } from '~~/database.types'
import { getUser } from '~~/server/functions/check-params'
import { TableEnum } from '~~/shared/types/database-type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await getUser(event)

  const { data } = await client
    .from(TableEnum.SHOPPING_LIST)
    .select('id, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return useChangeCaseObject(data || [])
})
