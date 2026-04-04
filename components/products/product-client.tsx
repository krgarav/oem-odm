"use client"

import { useState, Suspense } from "react"
import { ProductsGrid } from "./products-grid"
import { ProductsFilter } from "./products-filter"

export function ProductsClient() {
  const [category, setCategory] = useState("all")
  const [price, setPrice] = useState("all")

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-8 lg:flex-row">

          <aside className="w-full shrink-0 lg:w-64">
            <Suspense fallback={<div className="h-48 animate-pulse bg-muted" />}>
              <ProductsFilter
                selectedCategory={category}
                setSelectedCategory={setCategory}
                selectedPrice={price}
                setSelectedPrice={setPrice}
              />
            </Suspense>
          </aside>

          <div className="flex-1">
            <Suspense
              fallback={
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square animate-pulse bg-muted" />
                  ))}
                </div>
              }
            >
              <ProductsGrid category={category} />
            </Suspense>
          </div>

        </div>
      </div>
    </section>
  )
}