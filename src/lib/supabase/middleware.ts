import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const isPortalRoute = request.nextUrl.pathname.startsWith('/portal')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAuthRoute =
    request.nextUrl.pathname === '/portal/login' ||
    request.nextUrl.pathname === '/portal/register' ||
    request.nextUrl.pathname === '/admin/login'

  // Redirect to login if not authenticated on protected routes
  if (!user && (isPortalRoute || isAdminRoute) && !isAuthRoute) {
    const redirectUrl = isAdminRoute ? '/admin/login' : '/portal/login'
    const url = request.nextUrl.clone()
    url.pathname = redirectUrl
    return NextResponse.redirect(url)
  }

  // Redirect to dashboard if already authenticated on auth routes
  if (user && isAuthRoute) {
    const redirectUrl = request.nextUrl.pathname.startsWith('/admin')
      ? '/admin'
      : '/portal/dashboard'
    const url = request.nextUrl.clone()
    url.pathname = redirectUrl
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
