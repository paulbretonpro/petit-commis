import type { TRecipeFormCreate } from '~/utils/types/recipes'
import type { Database } from '~~/database.types'
import type { IRecipe } from '~~/server/api/recipes/type'

export default function () {
  const supabase = useSupabaseClient<Database>()

  const formCreateRecipe = ref<TRecipeFormCreate>({
    category: undefined,
    description: undefined,
    image: undefined,
    ingredients: [],
    name: undefined,
    nbPersons: 2,
    steps: [],
  })

  const addPhoto = async (recipeId: number, image: File) => {
    const user = useSupabaseUser()

    const filePath = `${user.value?.id}/${recipeId}`

    await supabase.storage
      .from(BucketStorage.RECIPE_IMAGE)
      .upload(filePath, image, {
        cacheControl: '3600',
        upsert: true,
      })
  }

  const addRecipe = async (body: TRecipeFormCreate) => {
    const { data: recipe } = await $fetch<{ data: IRecipe }>('/api/recipes', {
      method: 'POST',
      body: {
        ...body,
        hasImage: !!body.image,
      },
    })

    return recipe
  }

  return {
    addRecipe,
    addPhoto,
    formCreateRecipe,
  }
}
