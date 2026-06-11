import { useEffect, useState } from 'react'

export default function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }

    const saved = window.localStorage.getItem(key)
    if (saved !== null) {
      try {
        return JSON.parse(saved)
      } catch {
        return typeof initialValue === 'function' ? initialValue() : initialValue
      }
    }

    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
