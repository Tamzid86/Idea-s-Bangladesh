"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import SubscribeButton from "../../components/SubscribeButton/page"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center py-4 px-4 md:px-8 lg:px-40">
        <a href="/" className="flex items-center gap-2 md:gap-3">
          <img
            src="/images/logo.jpeg"
            alt="Ideas Bangladesh Logo"
            className="h-8 md:h-10 w-12 md:w-15 object-contain"
            style={{ borderRadius: "8px" }}
          />
          <span className="bg-gradient-to-r from-[#7eaa92] to-[#a7f6ad] bg-clip-text text-transparent text-lg md:text-2xl font-extrabold">
            Idea&apos;s Bangladesh
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="space-x-8 hidden md:flex">
          <a href="/home" className="hover:text-[#95C9AC] font-medium transition">Home</a>
          <a href="/about" className="hover:text-[#95C9AC] font-medium transition">About</a>
          {/* <a href="/contact" className="hover:text-[#95C9AC] font-medium transition">Contact</a> */}
        </div>

        {/* Desktop Subscribe Button */}
        <div className="hidden md:block">
          <SubscribeButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4">
            <a
              href="/home"
              className="block py-2 hover:text-[#95C9AC] font-medium transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/about"
              className="block py-2 hover:text-[#95C9AC] font-medium transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            {/* <a 
              href="/contact" 
              className="block py-2 hover:text-[#95C9AC] font-medium transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a> */}
            <div className="pt-2 border-t border-gray-100">
              <SubscribeButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
