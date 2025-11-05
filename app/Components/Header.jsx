"use client";
import Link from "next/link";


export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/favicon.ico" alt="logo" className="h-10 w-10" />
        <span className="text-2xl font-bold text-green-600">HABISOLO</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex gap-6 text-gray-700">
        <Link href="/home" className="hover:text-green-600 font-medium">
          Home
        </Link>
        <Link href="#about " className="hover:text-green-600 font-medium">
          About Us
        </Link>
        <Link href="#how" className="hover:text-green-600 font-medium">
          How it works
        </Link>
        <Link href="#testimonials" className="hover:text-green-600 font-medium">
          Testimonials
        </Link>
        <Link href="#faq" className="hover:text-green-600 font-medium">
          FAQ
        </Link>
      </nav>

      {/* CTA Button */}
      <Link
        href="#get-started"
        className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
      >
        Get Started →
      </Link>
    </header>
  );
}
