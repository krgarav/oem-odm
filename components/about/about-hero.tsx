"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      )

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 pt-20 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div>
            <div ref={titleRef}>
              <h1 className="font-serif text-6xl md:text-7xl font-bold text-amber-700 leading-tight">
                ABOUT US
              </h1>
            </div>

            <div ref={contentRef} className="mt-12 space-y-8">
              <div>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Glowgavin Overseas Pvt. Ltd Gain cosmetics Co. Ltd. (China) cosmetics provide the best solution for your makeup brand
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed font-light">
                We manage the process from concept to delivery so you can focus on your business
              </p>
            </div>
          </div>

          {/* Right Section with Image */}
          <div className="relative h-full">
            <div ref={imageRef} className="relative">
              {/* Decorative curved background */}
              <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-orange-200/60 to-amber-100/40 blur-2xl -z-10" />
              
              {/* Image container with border */}
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="/images/about-hero.jpg"
                  alt="Beauty professional with flower"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative curve at bottom */}
              <div className="absolute bottom-0 -left-20 w-96 h-48 rounded-full bg-gradient-to-r from-orange-200/40 to-transparent blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative curve */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tl from-orange-200/30 to-transparent blur-3xl opacity-60 -z-10" />
    </section>
  )
}
