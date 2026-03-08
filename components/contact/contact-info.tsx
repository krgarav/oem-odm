import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Beauty Boulevard", "Suite 500", "Los Angeles, CA 90001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@oemandodm.com", "press@oemandodm.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Closed"],
  },
]

export function ContactInfo() {
  return (
    <div>
      <h2 className="font-serif text-3xl font-bold text-foreground">Contact Information</h2>
      <p className="mt-3 text-muted-foreground">
        Reach out to us through any of the following channels.
      </p>

      <div className="mt-8 space-y-8">
        {contactDetails.map((detail, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <detail.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground">{detail.title}</h3>
              <div className="mt-1 space-y-1">
                {detail.lines.map((line, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="mt-12 aspect-video overflow-hidden bg-muted">
        <div className="flex h-full items-center justify-center border border-border">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-primary/30" />
            <p className="mt-4 text-sm text-muted-foreground">
              Interactive map coming soon
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Link */}
      <div className="mt-12 border border-border bg-card p-6">
        <h3 className="font-serif text-lg font-bold text-card-foreground">
          Frequently Asked Questions
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Looking for quick answers? Check out our FAQ section for common questions 
          about our products, shipping, and more.
        </p>
        <a
          href="/faq"
          className="mt-4 inline-block text-sm uppercase tracking-widest text-primary transition-colors hover:text-primary/80"
        >
          View FAQ
        </a>
      </div>
    </div>
  )
}
