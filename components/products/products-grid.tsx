"use client"

import Image from "next/image"
import { useState } from "react"
import { Eye } from "lucide-react"
import { ProductModal } from "./product-modal"

const products = [
  {
    id: 1,
    name: "Velvet Matte Lipstick",
    category: "Lips",
    image: "/images/products/matte-lipstick.jpg",
    description: "A luxurious matte lipstick that delivers intense color payoff with a velvety smooth finish. Long-lasting formula keeps lips hydrated and comfortable all day.",
    shades: ["Ruby Red", "Deep Maroon", "Rose Petal", "Nude Blush"],
    colors: ["#8B0000", "#5D1A1A", "#E8B4B8", "#D4A5A5"],
  },
  {
    id: 2,
    name: "Sultry Eyes Palette",
    category: "Eyes",
    image: "/images/products/eyeshadow-palette.jpg",
    description: "A stunning eyeshadow palette featuring 12 richly pigmented shades. From soft mattes to brilliant shimmers, create endless looks from day to night.",
    shades: ["Warm Neutrals", "Deep Burgundy", "Rose Gold", "Smoky Black"],
    colors: ["#C4A77D", "#722F37", "#B76E79", "#2C2C2C"],
  },
  {
    id: 3,
    name: "Flawless Skin Foundation",
    category: "Face",
    image: "/images/products/foundation.jpg",
    description: "A buildable, medium-to-full coverage foundation that blurs imperfections and creates a naturally radiant finish. Infused with skincare ingredients for all-day comfort.",
    shades: ["Porcelain", "Fair", "Medium", "Tan", "Deep"],
    colors: ["#F5E6D3", "#E8D4B8", "#D4A574", "#A67B5B", "#6B4423"],
  },
  {
    id: 4,
    name: "Volumizing Mascara",
    category: "Eyes",
    image: "/images/products/mascara.jpg",
    description: "An intensely volumizing mascara that creates dramatic, full lashes without clumping. Smudge-proof and long-wearing formula for all-day impact.",
    shades: ["Jet Black", "Deep Brown"],
    colors: ["#0A0A0A", "#3D2B1F"],
  },
  {
    id: 5,
    name: "Rose Bloom Blush",
    category: "Face",
    image: "/images/products/blush.jpg",
    description: "A silky pressed blush that delivers a natural flush of color. Buildable formula allows for subtle to dramatic looks. Infused with rose extracts for skin-loving benefits.",
    shades: ["Soft Pink", "Coral Rose", "Berry Flush", "Peach Glow"],
    colors: ["#FFB6C1", "#E57373", "#A94064", "#FFCBA4"],
  },
  {
    id: 6,
    name: "High Shine Lip Gloss",
    category: "Lips",
    image: "/images/products/lipgloss.jpg",
    description: "A non-sticky lip gloss that delivers brilliant shine and subtle color. Enriched with vitamin E and jojoba oil for soft, supple lips.",
    shades: ["Crystal Clear", "Pink Shimmer", "Berry Burst", "Nude Glow"],
    colors: ["#F8F8F8", "#FFB6C1", "#8B0A50", "#D4A5A5"],
  },
]

export function ProductsGrid() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} products
        </p>
        <select className="rounded-none border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none">
          <option>Sort by: Featured</option>
          <option>Name: A-Z</option>
          <option>Name: Z-A</option>
          <option>Category</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
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

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
