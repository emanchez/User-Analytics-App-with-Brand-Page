"use client";
import Link from "next/link";
import { useRef } from "react";
import useEventListener from "@/hooks/useEventListener";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEventListener(
    "click",
    (e: any) => {
      // Use DEBUG_SESSION from env or generate a fallback
      const sessionId =
        process.env.NEXT_PUBLIC_DEBUG_SESSION ||
        `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Compose the JSON object
      const eventData = {
        event_type: "click",
        element: e.target.localName,
        component: "Footer",
        user_session: sessionId,
      };

      console.log("Event data:", eventData);
      const sendData = async () => {
        try {
          const response = await fetch("http://localhost:5000/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
          });
          const data = await response.json();
          console.log("API Response:", data);
        } catch (error) {
          console.error("Failed to send data:", error);
        }
      };
      sendData();
    },
    footerRef
  );

  return (
    <footer ref={footerRef} className="bg-gray-200 text-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <nav className="flex space-x-8">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/blog" className="hover:text-gray-300 transition">
              Blog
            </Link>
            <Link href="/support" className="hover:text-gray-300 transition">
              Support
            </Link>
            <Link href="/about" className="hover:text-gray-300 transition">
              About
            </Link>
          </nav>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} TemplateBrand. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
