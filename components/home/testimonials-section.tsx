"use client"

import { Quote } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "The quality of these products is unmatched. My clients absolutely love the range of shades and the long-lasting formulas.",
    author: "Sarah Mitchell",
    role: "Professional Makeup Artist",
  },
  {
    quote: "I've tried countless brands, but OEM & ODM stands out for reliable quality and fast delivery.",
    author: "Emma Rodriguez",
    role: "Beauty Blogger",
  },
  {
    quote: "These cosmetics have transformed my business. The luxury feel and premium packaging impress every customer.",
    author: "Jennifer Chen",
    role: "Salon Owner",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 30, opacity: 0 },
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

      // Cards slide up with stagger
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.98 },
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
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Testimonials</p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-balance">What Our Clients Say</span>
          </h2>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="h-10 w-10 text-primary/30" />
              <blockquote className="mt-4 text-lg leading-relaxed text-card-foreground">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="mt-6 border-t border-border pt-6">
                <p className="font-serif text-lg font-bold text-card-foreground">
                  {testimonial.author}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
