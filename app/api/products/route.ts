import { NextRequest, NextResponse } from 'next/server'
import uniqueProducts from '@/components/helper/utils'

// In-memory product storage (in production, use a database)
let products: any[] = []

// Initialize with seed data on first run
let isInitialized = false

function initializeProducts() {
  if (!isInitialized) {
    products = JSON.parse(JSON.stringify(uniqueProducts))
    isInitialized = true
  }
}

function verifySessionFromRequest(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('admin_session')
  return !!sessionToken
}

export async function GET(request: NextRequest) {
  try {
    // Initialize products on first request
    initializeProducts()

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

    // Initialize products on first request
    initializeProducts()

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

export async function PUT(request: NextRequest) {
  try {
    // Verify admin session
    const isAdmin = verifySessionFromRequest(request)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Initialize products on first request
    initializeProducts()

    const body = await request.json()
    const { id, name, category, description, image, shades, colors } = body

    if (!id || !name || !category || !description || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const productIndex = products.findIndex((p: any) => p.id === id)
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    products[productIndex] = {
      id,
      name,
      category,
      description,
      image,
      shades: shades || [],
      colors: colors || []
    }

    return NextResponse.json(
      { success: true, product: products[productIndex] },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin session
    const isAdmin = verifySessionFromRequest(request)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Initialize products on first request
    initializeProducts()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const productIndex = products.findIndex((p: any) => p.id === parseInt(id))
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const deletedProduct = products.splice(productIndex, 1)[0]

    return NextResponse.json(
      { success: true, product: deletedProduct },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
