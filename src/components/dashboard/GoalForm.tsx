"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function GoalForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setError("");
    setLoading(true);

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), description: description.trim() }),
    });

    if (!res.ok) {
      setError("Failed to create goal. Please try again.");
    } else {
      setTitle("");
      setDescription("");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest rounded-lg p-6 shadow-soft border border-outline-variant/10 space-y-4"
    >
      <h3 className="font-bold text-on-surface">Add a new goal</h3>
      <Input
        placeholder="What do you want to achieve?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Any details? (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      {error && <p className="text-xs text-error">{error}</p>}
      <Button
        type="submit"
        loading={loading}
        className="w-full kinetic-gradient rounded-full text-on-primary font-bold"
      >
        Add Goal
      </Button>
    </form>
  );
}
