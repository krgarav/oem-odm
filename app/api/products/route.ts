import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import Product from '@/models/products'

function verifySessionFromRequest(request: NextRequest): boolean {
  return !!request.cookies.get('admin_session')
}

// GET all products
export async function GET() {
  try {
    await connectDB()
    const products = await Product.find().sort({ createdAt: -1 })

    return NextResponse.json({ success: true, products })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// CREATE product
export async function POST(request: NextRequest) {
  try {
    if (!verifySessionFromRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { name, category, description, image, shades, colors } = body

    if (!name || !category || !description || !image) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const product = await Product.create({
      name, 
      category,
      description,
      image,
      shades: shades || [],
      colors: colors || [],
    })

    return NextResponse.json({ success: true, product }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}

// UPDATE product
export async function PUT(request: NextRequest) {
  try {
    if (!verifySessionFromRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { id, ...rest } = body

    const product = await Product.findByIdAndUpdate(id, rest, {
      new: true,
    })

    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, product })
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

// DELETE product
export async function DELETE(request: NextRequest) {
  try {
    if (!verifySessionFromRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}