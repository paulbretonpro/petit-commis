import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/database.types'
import { TableEnum } from '~/server/type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data } = await client
    .from(TableEnum.INGREDIENTS)
    .select('*')
    .order('name', { ascending: true })

  return data
})
