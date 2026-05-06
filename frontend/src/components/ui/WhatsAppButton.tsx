"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({ phoneNumber, message = "Hallo, ik heb een vraag over IPTV NL.", className = "" }: WhatsAppButtonProps) {
  // Format phone number: remove + and spaces
  const formattedNumber = phoneNumber.replace(/[\+\s\-]/g, '');
  const waUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    // Google Tag Manager / Analytics tracking
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", "whatsapp_click", {
          event_category: "Contact",
          event_label: "WhatsApp Chat",
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "whatsapp_click",
        });
      }
    }
  };

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Chat via WhatsApp
    </a>
  );
}
