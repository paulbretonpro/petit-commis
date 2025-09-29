import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/database.types'
import { getRequiredUrlParams, getUser } from '~~/server/functions/check-params'
import { TableEnum } from '~~/shared/types/database-type'
import { RecipeFormCreateSchema } from '~~/app/utils/types/recipes'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  // Récupération de l'id du planning
  const recipeId = getRequiredUrlParams(event)

  // Récupération de l'utilisateur connecté
  const user = await getUser(event)

  const body = await readValidatedBody(event, RecipeFormCreateSchema.parse)

  // Vérification si la recette appartient à l'utilisateur connecté
  const { error } = await client
    .from(TableEnum.RECIPES)
    .update({
      name: body.name,
      description: body.description,
      nb_persons: body.nbPersons,
    })
    .eq('id', recipeId)
    .eq('owner_id', user.id)

  if (error) {
    throw error
  }

  // Modification des ingrédients
  if (body.ingredients.length) {
    const { error: errorIngredients } = await client
      .from(TableEnum.INGREDIENTS_RECIPES)
      .upsert([
        ...body.ingredients.map((ingredient) => ({
          recipe_id: recipeId,
          ingredient_id: ingredient.ingredientId,
          quantity: String(ingredient.quantity),
          unit: ingredient.unit,
        })),
      ])

    if (errorIngredients) {
      throw errorIngredients
    }
  }

  if (body.steps.length) {
    const { error: errorSteps } = await client
      .from(TableEnum.STEPS_RECIPES)
      .upsert(
        body.steps.map((step) => ({
          recipe_id: recipeId,
          step,
        }))
      )

    if (errorSteps) {
      throw errorSteps
    }
  }

  return {
    status: 'success',
  }
})
