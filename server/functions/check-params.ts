import { serverSupabaseUser } from '#supabase/server'
import type { H3Event } from 'h3'

export const getUser = async (event: H3Event) => {
  // Récupération de l'utilisateur connecté
  const user = await serverSupabaseUser(event)
  if (user === null) {
    throw new Error('user unauthorized')
  }

  return user
}

export const getRequiredUrlParams = (event: H3Event, params?: { search: string, name?: string }) => {
  // Récupération de l'id de la recette dans l'url
  const id = getRouterParam(event, params?.search ?? 'id')
  if (!id) {
    throw new Error(`${params?.name || params?.search || 'id'} unknown`)
  }

  return Number(id)
}