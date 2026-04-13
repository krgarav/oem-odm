import { NextRequest, NextResponse } from 'next/server'

const SESSION_TOKEN = 'admin_session'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protected admin routes
  const protectedRoutes = ['/admin/dashboard']
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get(SESSION_TOKEN)
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/products', '/api/upload']
}
