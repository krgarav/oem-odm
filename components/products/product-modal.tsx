"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useEffect } from "react"

interface Product {
  id: number
  name: string
  category: string
  image: string
  description: string
  shades: string[]
  colors: string[]
}

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden bg-background">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-secondary p-2 text-secondary-foreground transition-colors hover:bg-secondary/80"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              {product.category}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">
              {product.name}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Color Palette */}
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground">Color Palette:</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <span
                      className="h-8 w-8 rounded-full border-2 border-border shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {product.shades[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Display Notice */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm text-muted-foreground">
                This is a display-only catalog. For purchasing inquiries, please{" "}
                <a href="/contact" className="text-primary underline">
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
