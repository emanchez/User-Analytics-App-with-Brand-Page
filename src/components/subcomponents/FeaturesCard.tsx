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
      // Use DEBUG_SESSION from env or generate a fallback
      const sessionId =
        process.env.NEXT_PUBLIC_DEBUG_SESSION ||
        `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Compose the JSON object
      const eventData = {
        event_type: "click",
        element: e.target.localName,
        component: `FeaturesCard-${title}`,
        user_session: sessionId,
      };

      console.log("Event data:", eventData);
    },
    cardRef
  );

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
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
