"use client";
import useEventListener from "@/hooks/useEventListener";
import Link from "next/link";
import { useRef } from "react";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

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
        component: "Hero",
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
    heroRef
  );

  return (
    <section
      ref={heroRef}
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to TemplateBrand
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
          Discover amazing solutions that transform your business and drive
          success. We're here to help you achieve your goals with innovative
          tools and expert support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/about"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Learn More
          </Link>
          <Link
            href="/support"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
