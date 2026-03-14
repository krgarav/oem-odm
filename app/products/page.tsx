import { Suspense } from "react"
import { ProductsGrid } from "@/components/products/products-grid"
import { ProductsFilter } from "@/components/products/products-filter"
import { ProductsHero } from "@/components/products/products-hero"
import { ProductsClient } from "@/components/products/product-client"

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
      <>
      <ProductsHero />
      <ProductsClient />
    </>
    </>
  )
}
