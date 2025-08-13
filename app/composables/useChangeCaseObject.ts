import { camelCase, snakeCase } from 'change-case'

const caseFunctions: Record<string, (str: string) => string> = {
  camelCase,
  snakeCase,
}

export default function useChangeCaseObject(
  input: unknown,
  caseType: string = 'camelCase'
) {
  const transformKeys = (obj: unknown): unknown => {
    if (Array.isArray(obj)) {
      return obj.map(transformKeys)
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.entries(obj).reduce(
        (acc, [key, val]) => {
          const newKey = caseFunctions[caseType]?.(key) || key
          acc[newKey] =
            typeof val === 'object' && val !== null ? transformKeys(val) : val
          return acc
        },
        {} as Record<string, unknown>
      )
    }
    return obj
  }

  return transformKeys(input)
}
