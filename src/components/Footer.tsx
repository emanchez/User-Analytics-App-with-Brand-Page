"use client";
import Link from "next/link";
import { useRef } from "react";
import useEventListener from "@/hooks/useEventListener";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEventListener(
    "click",
    (e: any) => {
      console.log("Clicked element in footer: ", e.target.localName);
    },
    footerRef // Pass the ref itself, not ref.current
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
