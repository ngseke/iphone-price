'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ZodType } from 'zod'

interface SetOptions {
  history?: 'push' | 'replace'
}

interface Codec<Type> {
  serialize?: (value: Type) => string
  deserialize?: (raw: string) => unknown
}

export function useQueryState<Type>(
  key: string,
  schema: ZodType<Type>,
  defaultValue: Type,
  options?: Codec<Type>,
): [Type, (value: Type, options?: SetOptions) => void] {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const serialize =
    options?.serialize ??
    ((value: Type) => {
      if (value == null) return ''
      if (value instanceof Date) return value.toISOString()
      if (typeof value === 'object') return JSON.stringify(value)
      return String(value)
    })

  const deserialize =
    options?.deserialize ??
    ((raw: string) => {
      const lower = raw.toLowerCase()
      if (lower === 'true') return true
      if (lower === 'false') return false
      if (lower === 'null') return null
      if (!Number.isNaN(Number(raw)) && raw.trim() !== '') return Number(raw)

      try {
        if (
          (raw.startsWith('{') && raw.endsWith('}')) ||
          (raw.startsWith('[') && raw.endsWith(']'))
        ) {
          return JSON.parse(raw) as unknown
        }
      } catch {
        /* ignore */
      }
      return raw
    })

  function readInitial(): Type {
    const raw = searchParams.get(key)
    if (raw == null) return defaultValue
    const candidate = deserialize(raw)
    const parsed = schema.safeParse(candidate)
    return parsed.success ? parsed.data : defaultValue
  }

  const [state, _setState] = useState<Type>(() => readInitial())

  function setState(value: Type, options?: SetOptions) {
    _setState(value)

    const params = new URLSearchParams(searchParams.toString())
    const isDefault = (() => {
      try {
        if (
          typeof value === 'object' &&
          value !== null &&
          typeof defaultValue === 'object' &&
          defaultValue !== null
        ) {
          return JSON.stringify(value) === JSON.stringify(defaultValue)
        }
        return value === defaultValue
      } catch {
        return false
      }
    })()

    if (isDefault) {
      params.delete(key)
    } else {
      params.set(key, serialize(value))
    }

    const qs = params.toString()
    const url = qs ? `${pathname}?${qs}` : pathname

    const navigateOptions = { scroll: false }
    if (options?.history === 'replace') router.replace(url, navigateOptions)
    else router.push(url, navigateOptions)
  }

  return [state, setState]
}
