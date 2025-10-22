import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams, getUser } from '~~/server/functions/check-params'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const form = await readMultipartFormData(event)
  if (!form || form.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Aucune image envoyée',
    })
  }

  // Récupération de l'id de la recette dans l'url
  const recipeId = getRequiredUrlParams(event)

  // Récupération de l'utilisateur connecté
  const user = await getUser(event)

  console.log(form[0])

  await client.storage
    .from(BucketStorage.RECIPE_IMAGE)
    .upload(`${user?.id}/${recipeId}`, form[0].data, {
      contentType: form[0].type,
      upsert: true,
    })

  await client
    .from(TableEnum.RECIPES)
    .update({ has_image: true })
    .eq('id', recipeId)
})
