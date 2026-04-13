import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/app/lib/cloudinary'

function verifySessionFromRequest(request: NextRequest): boolean {
  return !!request.cookies.get('admin_session')
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = verifySessionFromRequest(request)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'products' }, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
        .end(buffer)
    })

    return NextResponse.json({
      success: true,
      imageUrl: upload.secure_url,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}