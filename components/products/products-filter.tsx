"use client"

import { useState } from "react"

const categories = [
  { id: "all", label: "All Products" },
  { id: "lips", label: "Lips" },
  { id: "eyes", label: "Eyes" },
  { id: "face", label: "Face" },
  { id: "skincare", label: "Skincare" },
   { id: "eye shadow", label: "Eye Shadow" },
   { id: "highlighter", label: "Highlighter" },
  
]

const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "under-25", label: "Under $25" },
  { id: "25-50", label: "$25 - $50" },
  { id: "50-100", label: "$50 - $100" },
  { id: "over-100", label: "Over $100" },
]

export function ProductsFilter({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}: any) {
  // const [selectedCategory, setSelectedCategory] = useState("all")
  // const [selectedPrice, setSelectedPrice] = useState("all")

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-serif text-lg font-bold text-foreground">Categories</h3>
        <div className="mt-4 space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`block w-full text-left text-sm transition-colors ${
                selectedCategory === category.id
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      {/* <div>
        <h3 className="font-serif text-lg font-bold text-foreground">Price Range</h3>
        <div className="mt-4 space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedPrice(range.id)}
              className={`block w-full text-left text-sm transition-colors ${
                selectedPrice === range.id
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div> */}

      {/* Display Notice */}
      <div className="border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          This is a display-only catalog. Products are not available for online purchase.
        </p>
      </div>
    </div>
  )
}
