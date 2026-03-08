import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative bg-primary py-24">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
          <span className="text-balance">Ready to Elevate Your Beauty Routine?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
          Explore our complete collection of premium cosmetics and discover the products 
          that will help you look and feel your best every day.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="group inline-flex items-center justify-center gap-2 bg-secondary px-8 py-4 text-sm uppercase tracking-widest text-secondary-foreground transition-all hover:bg-secondary/90"
          >
            Shop Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 border border-primary-foreground px-8 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary"
          >
            Get In Touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
