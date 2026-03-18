"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // If session is immediately available, email confirmation is disabled — go to dashboard
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    // Otherwise, email confirmation is required
    setLoading(false);
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-surface-container-lowest rounded-lg p-10 shadow-soft border border-outline-variant/10">
            <span className="material-symbols-outlined text-5xl text-primary mb-4 block">mark_email_unread</span>
            <h2 className="text-2xl font-extrabold mb-2">Check your email</h2>
            <p className="text-on-surface-variant text-sm">
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then sign in.
            </p>
            <Link href="/auth/login" className="mt-6 inline-block px-6 py-2 text-sm font-bold text-on-primary kinetic-gradient rounded-full shadow-glow hover:opacity-90 transition-all">
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Join VibeShift
          </h1>
          <p className="text-on-surface-variant">
            Create an account to start discovering events.
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest rounded-lg p-8 shadow-soft border border-outline-variant/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            {error && (
              <p className="text-sm text-error bg-error-container/20 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full kinetic-gradient rounded-full py-3 text-base font-bold text-on-primary shadow-glow hover:opacity-90"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
