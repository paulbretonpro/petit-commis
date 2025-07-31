import { serverSupabaseClient } from '#supabase/server'
import useChangeCaseObject from '~/composables/useChangeCaseObject'
import type { Database } from '~/database.types'
import { getUser } from '~/server/functions/check-params'
import { TableEnum } from '~/server/type'
import { RecipeFormCreateSchema } from '~/utils/types/recipes'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const user = await getUser(event)

  const body = await readValidatedBody(event, RecipeFormCreateSchema.parse)

  if (!body) {
    throw new Error('payload invalid')
  }

  // Création de la recette
  const {
    data: recipe,
    status,
    error,
  } = await client
    .from(TableEnum.RECIPES)
    .insert({
      category_id: body.category,
      description: body.description,
      is_public: body.isPublic,
      name: body.name,
      nb_persons: body.nbPersons,
      owner_id: user.id,
      has_image: body.hasImage,
    })
    .select('*')
    .single()

  if (error) {
    throw error
  }

  // Ajout des étapes
  if (body.steps.length) {
    const { error: errorSteps } = await client
      .from(TableEnum.STEPS_RECIPES)
      .insert(
        body.steps.map((step) => ({
          recipe_id: recipe.id,
          step,
        }))
      )

    if (errorSteps) {
      throw errorSteps
    }
  }

  // Ajout des ingrédients
  if (body.ingredients.length) {
    const { error: errorIngredients } = await client
      .from(TableEnum.INGREDIENTS_RECIPES)
      .insert(
        body.ingredients.map((ingredient) => ({
          recipe_id: recipe.id,
          ingredient_id: ingredient.ingredientId,
          quantity: String(ingredient.quantity),
          unit: ingredient.unit,
        }))
      )

    if (errorIngredients) {
      throw errorIngredients
    }
  }

  return {
    status,
    data: useChangeCaseObject(recipe),
  }
})
