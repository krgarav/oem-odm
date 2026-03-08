"use client"

import { useState } from "react"
import { Send } from "lucide-react"

const inquiryTypes = [
  "General Inquiry",
  "Product Information",
  "Partnership Opportunity",
  "Press & Media",
  "Wholesale Inquiry",
  "Other",
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Display-only - just show success message
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-none border border-border bg-card p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Send className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-6 font-serif text-2xl font-bold text-card-foreground">
          Thank You!
        </h3>
        <p className="mt-3 text-muted-foreground">
          Your message has been received. Our team will get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false)
            setFormData({ name: "", email: "", phone: "", inquiryType: "", message: "" })
          }}
          className="mt-8 border border-primary px-6 py-3 text-sm uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold text-foreground">Send Us a Message</h2>
      <p className="mt-3 text-muted-foreground">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 block w-full rounded-none border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email Address <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 block w-full rounded-none border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-2 block w-full rounded-none border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground">
              Inquiry Type <span className="text-primary">*</span>
            </label>
            <select
              id="inquiryType"
              required
              value={formData.inquiryType}
              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
              className="mt-2 block w-full rounded-none border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
            >
              <option value="">Select an option</option>
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground">
            Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="mt-2 block w-full resize-none rounded-none border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            placeholder="Tell us how we can help you..."
          />
        </div>

        <button
          type="submit"
          className="group inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Send Message
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  )
}
