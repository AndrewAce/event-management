"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-on-surface-variant">
            Sign in to continue your campus adventure.
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest rounded-lg p-8 shadow-soft border border-outline-variant/10">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-bold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
