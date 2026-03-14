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
    <section ref={sectionRef} className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Our Services</p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-secondary-foreground md:text-5xl">
            <span className="text-balance">What We Offer</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid gap-12 md:grid-cols-3">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="group flex flex-col gap-4"
            >
              <h3 className="font-serif text-xl font-bold text-foreground">
                {offering.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
