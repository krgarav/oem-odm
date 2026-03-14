import { AboutHero } from "@/components/about/about-hero"
import { AboutVision } from "@/components/about/about-vision"
import { AboutOfferings } from "@/components/about/about-offerings"

export const metadata = {
  title: "About Us | OEM & ODM - Gain Cosmetics",
  description: "Learn about Gain Cosmetics and our comprehensive OEM & ODM solutions for beauty brands. Premium quality cosmetics manufacturing and formulation services.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutVision />
      <AboutOfferings />
    </>
  )
}
