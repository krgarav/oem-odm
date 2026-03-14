import { Suspense } from "react"
import { ProductsGrid } from "@/components/products/products-grid"
import { ProductsFilter } from "@/components/products/products-filter"
import { ProductsHero } from "@/components/products/products-hero"

export const metadata = {
  title: "Products | OEM & ODM",
  description: "Explore our full collection of manufacturing and sourcing solutions.",
  openGraph: {
    title: "Products | OEM & ODM",
    description: "Explore our manufacturing solutions",
    type: "website",
  },
}

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="w-full shrink-0 lg:w-64">
              <Suspense fallback={<div className="h-48 animate-pulse bg-muted" />}>
                <ProductsFilter />
              </Suspense>
            </aside>
            <div className="flex-1">
              <Suspense fallback={<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse bg-muted" />
                ))}
              </div>}>
                <ProductsGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
