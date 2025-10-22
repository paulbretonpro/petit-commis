import type { TRecipeFormCreate } from '~/utils/types/recipes'
import type { Database } from '~~/database.types'
import type { IRecipe } from '~~/server/api/recipes/type'
import Compressor from 'compressorjs'

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

    new Compressor(image, {
      quality: 0.6,
      maxHeight: 500,
      maxWidth: 500,

      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        supabase.storage
          .from(BucketStorage.RECIPE_IMAGE)
          .upload(filePath, result, {
            cacheControl: '3600',
            upsert: true,
          })
      },
      error(err) {
        console.log(err.message)
      },
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
