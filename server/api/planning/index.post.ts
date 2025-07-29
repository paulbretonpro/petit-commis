import { serverSupabaseClient } from '#supabase/server'
import z from 'zod'
import type { Database } from '~/database.types'
import { getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'

const BodySchema = z.object({
  date: z.string(),
  recipeId: z.number().optional(),
  note: z.string().optional(),
  type: z.number().min(0).max(1)
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const user = await getUser(event)

  const body = await readValidatedBody(event, BodySchema.parse)

  if (!body || (!body.recipeId && !body.note)) {
    throw new Error('payload invalid')
  }

  const { status, error } = await client
    .from(TableEnum.PLANNING)
    .insert({
      date: body.date,
      recipe_id: body.recipeId,
      type: body.type,
      user_id: user.id,
      note: body.note
    })

  if (error) {
    throw error
  }

  return {
    status,
  }
})
