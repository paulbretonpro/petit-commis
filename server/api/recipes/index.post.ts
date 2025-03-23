import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import useRecipesCreateForm from "~/composables/useRecipesCreateForm"

export default defineEventHandler(async (event) => {
  const { schema } = useRecipesCreateForm()
  const client = await serverSupabaseClient(event)

  const user = await serverSupabaseUser(event)

  if (user === null) {
    throw new Error('user unauthorized')
  }

  const body = await readValidatedBody(event, schema.parse);

  if (!body) {
    throw new Error('payload invalide')
  }

  const { data, status, error } = await client.from('recipes').insert({
    category_id: body.categorie,
    description: body.description,
    is_public: body.isPublic,
    name: body.name,
    nb_persons: body.nbPersons,
    owner_id: user.id,
  }).select('*')

  if (error) {
    throw error
  }
  
  return {
    status,
    data
  }
})
