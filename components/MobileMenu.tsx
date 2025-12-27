"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ href: string; label: string }>;
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`fixed right-0 top-0 z-[60] h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6 pt-20">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="rounded-lg px-4 py-3 text-base font-medium text-[color:var(--mk-ink)] transition-colors hover:bg-gray-50 hover:text-[color:var(--mk-blue)]"
                style={{
                  animation: isOpen
                    ? `slideIn 300ms ease-out ${index * 50}ms both`
                    : "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Section */}
          <div
            className="mt-8 flex flex-col gap-3 border-t border-[color:var(--mk-border)] pt-6"
            style={{
              animation: isOpen ? "slideIn 300ms ease-out 300ms both" : "none",
            }}
          >
            <a
              className="rounded-full bg-[color:var(--mk-orange)] px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-95"
              href="tel:0645356387"
              onClick={onClose}
            >
              Pozovite 064 535 6387
            </a>
            <Link
              className="rounded-full border border-[color:var(--mk-blue)] px-4 py-3 text-center text-sm font-semibold text-[color:var(--mk-blue)] shadow-sm transition hover:bg-[color:var(--mk-blue)] hover:text-white"
              href="/kontakt"
              onClick={onClose}
            >
              Zakažite servis
            </Link>
          </div>

          {/* Footer Info */}
          <div
            className="mt-auto pt-6 text-center text-xs text-[color:var(--mk-muted)]"
            style={{
              animation: isOpen ? "slideIn 300ms ease-out 400ms both" : "none",
            }}
          >
            <p className="font-semibold">MATCO Frigo &amp; Elektro</p>
            <p className="mt-1">Servis i prodaja klime</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
