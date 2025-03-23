import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw new Error('user unauthorized')
  }

  const data = (await client
    .from('recipes')
    .select('*')
    .eq('owner_id', user.id)
  ).data
  
  return data
})
