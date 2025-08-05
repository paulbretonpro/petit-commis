// server/api/generate-shopping-list.post.ts
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    return { status: 401, body: { error: 'Unauthorized' } }
  }

  const body = await readBody(event)
  const { dates } = body

  if (!Array.isArray(dates) || dates.length === 0) {
    return { status: 400, body: { error: 'Missing dates array' } }
  }

  const { data, error } = await client.rpc('generate_and_insert_shopping_list', {
    p_user_id: user.id,
    p_dates: dates,
  })

  if (error) {
    return { status: 500, body: { error: error.message } }
  }

  return {
    status: 200,
    body: {
      message: 'Shopping list generated successfully',
      shoppingListId: data,
    }
  }
})
