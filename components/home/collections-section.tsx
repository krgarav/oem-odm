"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const collections = [
  {
    title: "Lip Collection",
    description: "From bold reds to subtle nudes, discover your perfect shade.",
    image: "/images/lips-collection.jpg",
    href: "/products?category=lips",
    count: "24 Products",
  },
  {
    title: "Eye Collection",
    description: "Stunning palettes and precision liners for captivating eyes.",
    image: "/images/eyes-collection.jpg",
    href: "/products?category=eyes",
    count: "32 Products",
  },
  {
    title: "Face Collection",
    description: "Flawless foundations and radiant highlighters for every skin tone.",
    image: "/images/face-collection.jpg",
    href: "/products?category=face",
    count: "28 Products",
  },
]

export function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Cards scale and fade in with stagger
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, rotateY: 15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={headerRef} className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Our Collections</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-secondary-foreground md:text-5xl">
              <span className="text-balance">Explore Our Categories</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary transition-colors hover:text-primary/80"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div ref={cardsRef} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href={collection.href}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-xs uppercase tracking-widest text-primary">
                  {collection.count}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-secondary-foreground">
                  {collection.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {collection.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
