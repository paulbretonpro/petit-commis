import { serverSupabaseClient } from '#supabase/server'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import type { Database } from '~~/database.types'
import { getUser } from '~~/server/functions/check-params'

interface IFavoriteRecipe {
  id: number
  category_id: number
  category_name: string
  nb_persons: number
  recipe_name: string
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await getUser(event)

  const query = client.rpc('get_favorite_recipes', {
    user_id: user.id,
  })

  const { data, error } = await query

  if (error) {
    throw error
  }

  return useChangeCaseObject(
    (data || []).map((recipe: IFavoriteRecipe) => {
      return {
        id: recipe.id,
        name: recipe.recipe_name,
        categoryId: recipe.category_id,
        nbPersons: recipe.nb_persons,
        category: {
          id: recipe.category_id,
          name: recipe.category_name,
        },
      }
    })
  )
})
