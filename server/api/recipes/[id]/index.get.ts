import { serverSupabaseClient } from '#supabase/server'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import type { Database } from '~/database.types'
import { getRequiredUrlParams, getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id de la recette dans l'url
  const recipeId = getRequiredUrlParams(event)

  // Récupération de l'utilisateur connecté
  const user = await getUser(event)

  // Vérification si la recette appartient à l'utilisateur connecté
  const { data: recipe, error } = await client
    .from(TableEnum.RECIPES)
    .select(`
      *,
      category:categories(id, name),
      ingredients:ingredients_recipes(
        unit,
        quantity,
        id:ingredient_id,
        ...ingredients(name)
      ),
      steps:steps_recipes(step)
    `)
    .eq('owner_id', user.id)
    .eq('id', recipeId)
    .single()

  if (recipe === null) {
    throw new Error('user unauthorized')
  }


  if (error) {
    throw error
  }

  return useChangeCaseObject(recipe)
})
