"use client"

import { Sparkles, Leaf, Award, Heart } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Crafted with the finest ingredients sourced from around the world.",
  },
  {
    icon: Leaf,
    title: "Natural Formulas",
    description: "Botanically infused formulations free from harmful chemicals.",
  },
  {
    icon: Award,
    title: "Expert Crafted",
    description: "Developed by world-class cosmetic chemists and makeup artists.",
  },
  {
    icon: Heart,
    title: "Cruelty Free",
    description: "Never tested on animals. We believe in ethical beauty practices.",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Cards stagger animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={headerRef} className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Why Choose Us</p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-balance">The OEM & ODM Difference</span>
          </h2>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative border border-border bg-card p-8 transition-all hover:border-primary hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
