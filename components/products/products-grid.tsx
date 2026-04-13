"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import { ProductModal } from "./product-modal"
import { useRef } from "react"

interface Product {
  id: number
  name: string
  category: string
  image: string
  description: string
  shades: string[]
  colors: string[]
}

export function ProductsGrid({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        if (data.success) {
          setProducts(data.products)
        }
      } catch (error) {
        console.error('[v0] Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
        (product) => product.category.toLowerCase() === category
      )


  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  useEffect(() => {
    if (gridRef.current) {
      const yOffset = -120 // adjust based on your navbar height
      const y =
        gridRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset

      window.scrollTo({
        top: y,
        behavior: "smooth",
      })
    }
  }, [currentPage])
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getVisiblePages = () => {
    const maxVisible = 5 // how many buttons you want
    const pages = []

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = start + maxVisible - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <>
      <div ref={gridRef} className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedProducts.length} of {filteredProducts.length} products
        </p>
        <select className="rounded-none border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none">
          <option>Sort by: Featured</option>
          <option>Name: A-Z</option>
          <option>Name: Z-A</option>
          <option>Category</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="flex items-center gap-2 bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground">
                  <Eye className="h-4 w-4" />
                  Quick View
                </button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-widest text-primary">
                {product.category}
              </p>
              <h3 className="mt-1 font-serif text-lg font-bold text-foreground">
                {product.name}
              </h3>
              <div className="mt-2 flex gap-1">
                {product.colors.slice(0, 4).map((color, index) => (
                  <span
                    key={index}
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                    title={product.shades[index]}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="flex h-4 w-4 items-center justify-center text-[10px] text-muted-foreground">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="border px-3 py-1 text-sm disabled:opacity-50"
        >
          Prev
        </button>

        {/* First page */}
        {visiblePages[0] > 1 && (
          <>
            <button onClick={() => setCurrentPage(1)} className="border px-3 py-1 text-sm">
              1
            </button>
            {visiblePages[0] > 2 && <span className="px-2">...</span>}
          </>
        )}

        {/* Middle pages */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 text-sm border ${currentPage === page ? "bg-primary text-white" : ""
              }`}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2">...</span>
            )}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="border px-3 py-1 text-sm"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="border px-3 py-1 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
