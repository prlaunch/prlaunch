"use client"

import { useEffect, useState } from 'react'

export function useVariant(): 'control' | 'b' {
  const [variant, setVariant] = useState<'control' | 'b'>('control')
  
  useEffect(() => {
    // Read variant from cookie
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('checkout_variant='))
      ?.split('=')[1]
    
    if (cookieValue === 'b') {
      setVariant('b')
    } else {
      setVariant('control')
    }
  }, [])
  
  return variant
}

// Helper function to get variant synchronously (for links)
export function getVariantParam(): string {
  if (typeof window === 'undefined') return ''
  
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('checkout_variant='))
    ?.split('=')[1]
  
  return cookieValue === 'b' ? '?variant=b' : ''
}
