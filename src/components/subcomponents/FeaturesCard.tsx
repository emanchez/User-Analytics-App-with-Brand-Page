"use client";
import { useRef } from "react";
import useEventListener from "@/hooks/useEventListener";

interface FeaturesCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeaturesCard = ({ title, description, icon }: FeaturesCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEventListener(
    "click",
    (e: any) => {
      // Sanitize the title for safe usage
      const safeTitle = title
        .replace(/[^a-zA-Z0-9]/g, "_") // Replace non-alphanumeric with underscore
        .replace(/_{2,}/g, "_") // Replace multiple underscores with single
        .replace(/^_|_$/g, ""); // Remove leading/trailing underscores

      // Use DEBUG_SESSION from env or generate a fallback
      const sessionId =
        process.env.NEXT_PUBLIC_DEBUG_SESSION ||
        `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Compose the JSON object
      const eventData = {
        event_type: "click",
        element: e.target.localName,
        component: `FeaturesCard-${safeTitle}`,
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
    cardRef
  );

  return (
    <div
      ref={cardRef}
      className="features bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="text-4xl mb-4 text-center">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
};

export default FeaturesCard;
