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
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none none"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[60vh] bg-gradient-to-br from-orange-100/50 via-white to-amber-50/30 py-24 lg:py-32 flex items-center overflow-hidden">
      {/* Decorative curve background */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-orange-200/40 to-transparent blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-amber-200/30 to-transparent blur-3xl -z-10 opacity-50" />

      <div className="mx-auto max-w-6xl px-4 w-full">
        <div ref={contentRef} className="text-center">
          <div className="inline-block mb-8">
            <div className="relative bg-gradient-to-r from-orange-100 to-amber-100 rounded-full px-8 py-4 border-2 border-orange-200/60">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-700 leading-relaxed">
                Glamour Unveiled:
                <br className="hidden md:block" />
                Your Signature Beauty Journey
              </h2>
            </div>
          </div>

          <p className="mt-12 font-serif text-3xl md:text-4xl font-light text-white drop-shadow-lg">
            Where Beauty meets innovation
          </p>
        </div>
      </div>
    </section>
  )
}
