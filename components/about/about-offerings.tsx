"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutOfferings() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none none"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const offerings = [
    {
      title: "PRIVATE LABEL COSMETICS",
      description: "Gain cosmetics provides one-stop private label cosmetics solutions for new and established companies, beauty salons, makeup artists, and e-commerce vendors. We collaborate closely with each client to develop exceptional products in elegant packaging, prepared for immediate market entry."
    },
    {
      title: "CUSTOM FORMULATIONS",
      description: "If our stock line doesn't have quite what you're looking for, you can work with our lab to dream up your own custom colors or formulations."
    },
    {
      title: "COSMETICS FORMULATION",
      description: "For brands seeking truly distinctive offerings, our in-house research and development experts will craft a formula perfectly matching your requirements. From lipsticks and foundation to eyeshadow palettes and other makeup products, we'll guide you from initial idea to retail shelves."
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={cardsRef} className="grid gap-12 lg:gap-16">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="group relative border-b border-orange-200/40 pb-12 last:border-b-0 last:pb-0 lg:pb-16 lg:last:pb-0"
            >
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-amber-700 mb-6 tracking-tight">
                {offering.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl font-light">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tl from-orange-100/30 to-transparent blur-3xl opacity-40 -z-10 pointer-events-none" />
    </section>
  )
}
