import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // We will use Contact Form 7 REST API
    // Endpoint: /wp-json/contact-form-7/v1/contact-forms/{form_id}/feedback
    // We need the form ID. Let's use an environment variable or a fallback.
    const formId = process.env.CONTACT_FORM_ID || "1"; // Default to 1 if not set
    const wpUrl = process.env.WORDPRESS_URL || "http://iptv-nederland.test";

    // Contact Form 7 expects form data (multipart/form-data)
    const formData = new FormData();
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-subject", subject || "New Contact Message");
    formData.append("your-message", message);

    const response = await fetch(
      `${wpUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || data.status === "mail_failed" || data.status === "validation_failed") {
      console.error("CF7 Error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send message" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: data.message });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
