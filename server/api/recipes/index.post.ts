import { serverSupabaseClient } from '#supabase/server'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import useRecipesCreateForm from "~/composables/useRecipesCreateForm"
import type { Database } from '~/database.types'
import { getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'

export default defineEventHandler(async (event) => {
  const { schema } = useRecipesCreateForm()

  const client = await serverSupabaseClient<Database>(event)

  const user = await getUser(event)

  const body = await readValidatedBody(event, schema.parse);

  if (!body) {
    throw new Error('payload invalid')
  }

  const { data, status, error } = await client
    .from(TableEnum.RECIPES)
    .insert({
      category_id: body.categorie,
      description: body.description,
      is_public: body.isPublic,
      name: body.name,
      nb_persons: body.nbPersons,
      owner_id: user.id,
    })
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return {
    status,
    data: useChangeCaseObject(data)
  }
})
