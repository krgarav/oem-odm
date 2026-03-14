"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            delay: 0.2
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">About Our Company</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-secondary-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Glowgavin Overseas</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
            Glowgavin Overseas Pvt. Ltd Gain cosmetics Co. Ltd. (China) cosmetics provide the best solution for your makeup brand. We manage the process from concept to delivery so you can focus on your business.
          </p>
        </div>
      </div>
    </section>
  )
}
