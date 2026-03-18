"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface Props {
  eventId: string;
  isRegistered: boolean;
  isAuthenticated: boolean;
  isFull: boolean;
}

export default function EventRegistrationButton({
  eventId,
  isRegistered,
  isAuthenticated,
  isFull,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(isRegistered);

  async function handleClick() {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/registrations", {
      method: registered ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    });

    if (res.ok) {
      setRegistered(!registered);
      router.refresh();
    }

    setLoading(false);
  }

  if (isFull && !registered) {
    return (
      <Button variant="secondary" disabled className="w-full rounded-full py-4 text-lg">
        Event Full
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      loading={loading}
      variant={registered ? "secondary" : "primary"}
      className={`w-full rounded-full py-4 text-lg font-bold ${
        !registered ? "kinetic-gradient text-on-primary shadow-glow-lg" : ""
      }`}
    >
      {registered ? "Cancel Registration" : "Register for Event"}
    </Button>
  );
}
