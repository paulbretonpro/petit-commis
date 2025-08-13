import { BucketStorage } from '~~/shared/types/database-type'

export default function () {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getImage = (recipeId: number) => {
    const { data } = supabase.storage
      .from(BucketStorage.RECIPE_IMAGE)
      .getPublicUrl(`${user.value?.id}/${recipeId}`)

    return data.publicUrl
  }

  return {
    getImage,
  }
}
