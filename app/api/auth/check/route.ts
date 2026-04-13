import { NextRequest, NextResponse } from 'next/server'

function verifySessionFromRequest(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('admin_session')
  return !!sessionToken
}

export async function GET(request: NextRequest) {
  try {
    const isAdmin = verifySessionFromRequest(request)
    
    if (!isAdmin) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { authenticated: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}
