"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ShimmerButton } from "../ui/shimmer-button";
import Link from "next/link";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 mx-4 sm:mx-6 lg:mx-8">
        <div className="bg-card/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 sm:h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Hood
                </div>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                <Link
                  href="#how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="#for-organizers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  For Organizers
                </Link>
                <Link
                  href="#communities"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Communities
                </Link>
                <Link
                  href="/auth/sign-in"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ShimmerButton className="shadow-lg">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-base">
                      Get Started
                    </span>
                  </ShimmerButton>
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full w-full px-6">
          <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
            <a
              href="#how-it-works"
              onClick={toggleMobileMenu}
              className="text-xl text-muted-foreground hover:text-foreground transition-colors w-full text-center py-3 border-b border-border"
            >
              How It Works
            </a>
            <a
              href="#for-organizers"
              onClick={toggleMobileMenu}
              className="text-xl text-muted-foreground hover:text-foreground transition-colors w-full text-center py-3 border-b border-border"
            >
              For Organizers
            </a>
            <a
              href="#communities"
              onClick={toggleMobileMenu}
              className="text-xl text-muted-foreground hover:text-foreground transition-colors w-full text-center py-3 border-b border-border"
            >
              Communities
            </a>
            <a
              href="#login"
              onClick={toggleMobileMenu}
              className="text-xl text-muted-foreground hover:text-foreground transition-colors w-full text-center py-3 border-b border-border"
            >
              Login
            </a>
            <div className="mt-6 w-full flex justify-center">
              <ShimmerButton
                className="shadow-lg w-full max-w-xs"
                onClick={toggleMobileMenu}
              >
                <span className="whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-tight">
                  Get Started
                </span>
              </ShimmerButton>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
