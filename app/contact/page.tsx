import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactHero } from "@/components/contact/contact-hero"

export const metadata = {
  title: "Contact | OEM & ODM",
  description: "Get in touch with OEM & ODM. We'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  )
}
