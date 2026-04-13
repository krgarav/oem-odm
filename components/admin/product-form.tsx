'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ProductFormProps {
  onSuccess?: () => void
}

const CATEGORIES = [
  'Lips',
  'Eyes',
  'Face',
  'Skincare',
  'Eye Shadow',
  'Highlighter',
  'Primer'
]

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    category: 'Lips',
    description: '',
    shades: [''],
    colors: ['']
  })
  const MAX_SIZE = 5 * 1024 * 1024 // 5MB 
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_SIZE) {
    setError('File size must be 5MB or less')
    return
    }
    
    setUploading(true)
    setError('')

    try {
      const formDataObj = new FormData()
      formDataObj.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataObj,
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Upload failed')
        setUploading(false)
        return
      }

      setImageUrl(data.imageUrl)
      setSuccess('Image uploaded successfully')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleShadeChange = (index: number, value: string) => {
    const newShades = [...formData.shades]
    newShades[index] = value
    setFormData(prev => ({ ...prev, shades: newShades }))
  }

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...formData.colors]
    newColors[index] = value
    setFormData(prev => ({ ...prev, colors: newColors }))
  }

  const addShadeColor = () => {
    setFormData(prev => ({
      ...prev,
      shades: [...prev.shades, ''],
      colors: [...prev.colors, '']
    }))
  }

  const removeShadeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      shades: prev.shades.filter((_, i) => i !== index),
      colors: prev.colors.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name || !formData.category || !formData.description || !imageUrl) {
      setError('Please fill in all required fields and upload an image')
      return
    }

    const filteredShades = formData.shades.filter(s => s.trim() !== '')
    const filteredColors = formData.colors.filter(c => c.trim() !== '')

    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          shades: filteredShades,
          colors: filteredColors
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create product')
        setLoading(false)
        return
      }

      setSuccess('Product added successfully!')
      setFormData({
        name: '',
        category: 'Lips',
        description: '',
        shades: [''],
        colors: ['']
      })
      setImageUrl('')
      if (fileInputRef.current) fileInputRef.current.value = ''

      if (onSuccess) {
        setTimeout(onSuccess, 500)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-slate-200">
      <h2 className="text-2xl font-serif font-bold text-slate-900">Add New Product</h2>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Product Image *</label>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 disabled:opacity-50"
            />
          </div>
        </div>
        {imageUrl && (
          <div className="mt-4 relative w-full h-48">
            <Image
              src={imageUrl}
              alt="Product preview"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Product Name *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g., Velvet Matte Lipstick"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          disabled={loading}
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          disabled={loading}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter product description"
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          disabled={loading}
        />
      </div>

      {/* Shades and Colors */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-slate-700">Shades & Colors</label>
          <button
            type="button"
            onClick={addShadeColor}
            className="text-sm text-slate-600 hover:text-slate-900 font-medium"
          >
            + Add Shade
          </button>
        </div>

        <div className="space-y-3">
          {formData.shades.map((shade, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={shade}
                onChange={(e) => handleShadeChange(index, e.target.value)}
                placeholder="Shade name (e.g., Ruby Red)"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                disabled={loading}
              />
              <input
                type="color"
                value={formData.colors[index] || '#000000'}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="w-12 h-10 border border-slate-300 rounded-lg cursor-pointer"
                disabled={loading}
              />
              {formData.shades.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeShadeColor(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  )
}
