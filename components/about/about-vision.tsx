"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutVision() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animations with stagger
      const contentElements = contentRef.current?.children
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              toggleActions: "play none none none"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl mb-6">
            Our Vision
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-8">
            We believe beauty should be accessible to all, and every brand deserves premium quality products. At Glowgavin Overseas, we combine innovation with craftsmanship to deliver solutions that exceed expectations.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Our commitment is to be your trusted partner in bringing your beauty vision to life, with uncompromising quality and exceptional service at every step.
          </p>
        </div>
      </div>
    </section>
  )
}
