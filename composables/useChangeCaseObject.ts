import { camelCase, snakeCase } from 'change-case'

const caseFunctions: Record<string, (str: string) => string> = {
  camelCase,
  snakeCase,
}

export default function useChangeCaseObject(input: any, caseType: string = 'camelCase') {
  const transformKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(transformKeys)
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.entries(obj).reduce((acc, [key, val]) => {
        const newKey = caseFunctions[caseType]?.(key) || key
        acc[newKey] = typeof val === 'object' && val !== null ? transformKeys(val) : val
        return acc
      }, {} as Record<string, any>)
    }
    return obj
  }

  return transformKeys(input)
}
