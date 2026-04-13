"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import gsap from "gsap"
import Image from "next/image";
const navLinks: Array<{ href: string; label: string; isAdmin?: boolean }> = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/login", label: "Admin", isAdmin: true },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial header animation
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )

      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power3.out" }
      )

      // Nav links stagger
      const navItems = navRef.current?.children
      if (navItems) {
        gsap.fromTo(
          navItems,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power3.out" }
        )
      }
    }, headerRef)

    return () => ctx.revert()
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
        )
        gsap.fromTo(
          mobileMenuRef.current.children[0]?.children || [],
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.1, ease: "power3.out" }
        )
      }
    }
  }, [isMenuOpen])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full bg-secondary text-secondary-foreground">
      {/* Top bar */}
      <div className="border-b border-primary/20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <p className="text-center text-xs tracking-widest text-primary-foreground uppercase">
            OEM & ODM — Premium Products for Modern Businesses
          </p>
        </div>
      </div>

      {/* Main header */}
      <nav className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link ref={logoRef} href="/" className="flex items-center gap-2">
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary"> */}
               <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary">
              {/* <span className="font-serif text-lg font-bold text-primary-foreground">L</span> */}
              <Image
                src="/logo_512x512.png"
                alt="GlowGavin Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight">
              OEM <span className="text-primary">&</span> ODM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-widest transition-colors hover:text-primary ${
                  link.isAdmin ? 'ml-4 text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 text-white hover:bg-slate-800 hover:text-white' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 transition-colors hover:bg-primary/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="mt-4 overflow-hidden border-t border-primary/20 pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest transition-colors hover:text-primary ${
                    link.isAdmin ? 'text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 text-white hover:bg-slate-800 hover:text-white inline-block w-fit' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
