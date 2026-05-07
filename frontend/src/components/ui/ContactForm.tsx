"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Send } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        
        // Track conversion in GTM
        if (typeof window !== "undefined") {
          if (window.gtag) {
            window.gtag("event", "generate_lead", {
              event_category: "Contact",
              event_label: "Contact Form Submit",
            });
          }
          if (window.dataLayer) {
            window.dataLayer.push({
              event: "generate_lead",
              form_id: "contact_form",
            });
          }
        }
      } else {
        console.error("Form error:", result.error);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80">
            Naam *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full h-12 px-4 rounded-lg bg-surface border border-surface-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
            placeholder="Uw naam"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">
            E-mailadres *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full h-12 px-4 rounded-lg bg-surface border border-surface-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
            placeholder="uw@email.nl"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
          Onderwerp
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w-full h-12 px-4 rounded-lg bg-surface border border-surface-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
          placeholder="Waar gaat uw bericht over?"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80">
          Bericht *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full p-4 rounded-lg bg-surface border border-surface-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors resize-y"
          placeholder="Hoe kunnen we u helpen?"
        />
      </div>

      {status === "success" && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
          Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
          Er is een fout opgetreden. Probeer het later opnieuw.
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2"
        size="lg"
      >
        {isSubmitting ? (
          "Verzenden..."
        ) : (
          <>
            Verstuur Bericht <Send className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}
