"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  user?: { name?: string | null; role: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const navLinks = [
    { href: "/events", label: "Events" },
    { href: "/about", label: "Community" },
    { href: "/contact", label: "Collaborate" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-nav border-b border-outline-variant/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Links */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-primary"
          >
            VibeShift
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  pathname.startsWith(link.href)
                    ? "text-primary"
                    : "text-on-surface-variant"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  pathname.startsWith("/admin")
                    ? "text-primary"
                    : "text-on-surface-variant"
                }`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-5 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container rounded-full transition-all"
              >
                {user.name ?? "Dashboard"}
              </Link>
              <button
                onClick={handleSignOut}
                className="px-6 py-2 text-sm font-bold text-on-primary kinetic-gradient rounded-full shadow-glow hover:opacity-90 transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-5 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container rounded-full transition-all"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 text-sm font-bold text-on-primary kinetic-gradient rounded-full shadow-glow hover:opacity-90 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-2 border-t border-outline-variant/10 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-on-surface rounded-lg hover:bg-surface-container transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-on-surface rounded-lg hover:bg-surface-container transition-colors"
            >
              Admin
            </Link>
          )}
          <div className="mt-2 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-on-surface rounded-lg hover:bg-surface-container"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-bold text-on-primary kinetic-gradient rounded-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-center text-on-surface border border-outline-variant rounded-full"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-center text-on-primary kinetic-gradient rounded-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
