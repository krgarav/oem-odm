"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
      )

      // Content animations with stagger
      const contentElements = contentRef.current?.children
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            stagger: 0.15, 
            ease: "power3.out",
            delay: 0.5 
          }
        )
      }

      // Scroll indicator animation
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: "power2.out" }
      )

      // Continuous bounce for scroll indicator
      gsap.to(scrollIndicatorRef.current?.querySelector(".scroll-line"), {
        scaleY: 1.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] overflow-hidden bg-secondary">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/hero-makeup.jpg"
          alt="Luxury makeup collection"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-32 lg:py-48">
        <div ref={contentRef} className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">
            Premium OEM Services
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight text-secondary-foreground md:text-6xl lg:text-7xl">
            <span className="text-balance">Elevate Your</span>
            <br />
            <span className="text-primary">Natural Beauty</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Discover our OEM and ODM solutions built for consistency, quality, and faster time-to-market.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-primary px-8 py-4 text-sm uppercase tracking-widest text-secondary-foreground transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="scroll-line h-12 w-px origin-top bg-primary/50" />
        </div>
      </div>
    </section>
  )
}
