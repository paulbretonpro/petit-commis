import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const data = (await client.from('ingredients').select('*').order('name', { ascending: true })).data
  
  return data
})
