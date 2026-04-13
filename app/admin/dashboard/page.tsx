'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LogOut, Plus } from 'lucide-react'
import { ProductForm } from '@/components/admin/product-form'

interface Product {
  id: number
  name: string
  category: string
  description: string
  image: string
  shades: string[]
  colors: string[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.status === 401) {
          router.push('/admin/login')
        } else if (response.ok) {
          const data = await response.json()
          setProducts(data.products)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleProductAdded = () => {
    setShowForm(false)
    // Refresh products list
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Add Product Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Products Management
            </h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={20} />
                Add Product
              </button>
            )}
          </div>

          {showForm && (
            <div className="mb-8">
              <ProductForm onSuccess={handleProductAdded} />
              <button
                onClick={() => setShowForm(false)}
                className="mt-4 text-slate-600 hover:text-slate-900 text-sm font-medium"
              >
                ← Cancel
              </button>
            </div>
          )}
        </div>

        {/* Products List */}
        <div>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Products ({products.length})
          </h3>

          {products.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
              <p className="text-slate-600">No products added yet. Click "Add Product" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative w-full h-48 bg-slate-100">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-slate-900 mb-1">{product.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">
                      {product.category}
                    </p>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    {product.shades.length > 0 && (
                      <div className="flex gap-2 flex-wrap mb-2">
                        {product.shades.map((shade, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded"
                          >
                            <div
                              className="w-3 h-3 rounded-full border border-slate-300"
                              style={{
                                backgroundColor: product.colors[idx] || '#000000'
                              }}
                            />
                            <span className="text-slate-700">{shade}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-500">ID: {product.id}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
