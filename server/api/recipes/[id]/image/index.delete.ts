import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams, getUser } from '~~/server/functions/check-params'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id de la recette dans l'url
  const recipeId = getRequiredUrlParams(event)

  // Récupération de l'utilisateur connecté
  const user = await getUser(event)

  await client.storage
    .from(BucketStorage.RECIPE_IMAGE)
    .remove([`${user?.id}/${recipeId}`])

  await client
    .from(TableEnum.RECIPES)
    .update({ has_image: false })
    .eq('id', recipeId)
})
