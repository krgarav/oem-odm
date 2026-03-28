import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "Website",
          email: "verified@yourdomain.com",
        },
        to: [
          {
            email: "your@email.com",
          },
        ],
        subject: "New Contact Form Message",
        htmlContent: `
          <h3>New Message</h3>
          <p><b>Name:</b> ${body.name}</p>
          <p><b>Email:</b> ${body.email}</p>
          <p><b>Phone:</b> ${body.phone}</p>
          <p><b>Type:</b> ${body.inquiryType}</p>
          <p><b>Message:</b> ${body.message}</p>
        `,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error(data)
      return NextResponse.json({ success: false }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}