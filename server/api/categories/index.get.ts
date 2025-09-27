import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/database.types'
import { TableEnum } from '~~/shared/types/database-type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data } = await client
    .from(TableEnum.CATEGORIES)
    .select('*')
    .order('name', { ascending: true })

  return data
})
