import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if this is one of the pages we're A/B testing
  const isTestPage = 
    request.nextUrl.pathname.startsWith('/checkout/start') ||
    request.nextUrl.pathname.startsWith('/checkout/how-it-works') ||
    request.nextUrl.pathname.startsWith('/checkout/step-5') ||
    request.nextUrl.pathname.startsWith('/payment')
  
  if (!isTestPage) {
    return NextResponse.next()
  }
  
  const response = NextResponse.next()
  
  // Check for variant parameter in URL
  const variantParam = request.nextUrl.searchParams.get('variant')
  
  // Check for existing cookie
  const existingVariant = request.cookies.get('checkout_variant')?.value
  
  // Priority 1: If URL has variant=b, set cookie to b
  if (variantParam === 'b') {
    response.cookies.set('checkout_variant', 'b', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // Allow client-side reading
    })
  } 
  // Priority 2: If URL explicitly requests control/a, reset to control
  else if (variantParam === 'a' || variantParam === 'control') {
    response.cookies.set('checkout_variant', 'control', {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
    })
  }
  // Priority 3: If no URL param but no existing cookie, default to control
  else if (!existingVariant) {
    response.cookies.set('checkout_variant', 'control', {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
    })
  }
  // Priority 4: If existing cookie and no URL param, keep existing cookie
  // (do nothing, response already has the cookie from request)
  
  return response
}

export const config = {
  matcher: [
    '/checkout/start/:path*',
    '/checkout/how-it-works/:path*',
    '/checkout/step-5/:path*',
    '/payment/:path*',
  ],
}
