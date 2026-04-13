import { NextRequest, NextResponse } from 'next/server'

// In-memory product storage (in production, use a database)
let products: any[] = []

// Initialize with seed data on first run
let isInitialized = false

function verifySessionFromRequest(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('admin_session')
  return !!sessionToken
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin session
    const isAdmin = verifySessionFromRequest(request)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: true, products },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const isAdmin = verifySessionFromRequest(request)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, category, description, image, shades, colors } = body

    if (!name || !category || !description || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1,
      name,
      category,
      description,
      image,
      shades: shades || [],
      colors: colors || []
    }

    products.push(newProduct)

    return NextResponse.json(
      { success: true, product: newProduct },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
