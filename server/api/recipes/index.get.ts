import { serverSupabaseClient } from '#supabase/server'
import z from 'zod'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import type { Database } from '~/database.types'
import { getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'

const ParamsSchema = z.object({
  search: z.string().nullish(),
  ingredientIds: z.array(z.number()).default([]),
  categoryId: z.string().nullish()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await getUser(event)

  const params = await getValidatedQuery(event, ParamsSchema.parse)

  const query = client
    .from(TableEnum.RECIPES)
    .select(`
      *,
      category:categories(
        id,
        name
      )
    `)
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  if (params.search && params.search.length >= 3) {
    query.ilike('name', `%${params.search}%`)
  }

  if (params.categoryId) {
    query.eq('category_id', Number(params.categoryId))
  }
  
  const { data } = await query
  
  return useChangeCaseObject(data)
})
