"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { Event } from "@/types";

interface EventFormProps {
  event?: Event;
}

export default function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const isEditing = !!event;

  function toDatetimeLocal(date?: Date | null) {
    if (!date) return "";
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [startDate, setStartDate] = useState(toDatetimeLocal(event?.startDate));
  const [endDate, setEndDate] = useState(toDatetimeLocal(event?.endDate));
  const [capacity, setCapacity] = useState(event?.capacity?.toString() ?? "");
  const [imageUrl, setImageUrl] = useState(event?.imageUrl ?? "");
  const [published, setPublished] = useState(event?.published ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      title,
      description,
      location,
      startDate,
      endDate,
      capacity: capacity ? parseInt(capacity) : null,
      imageUrl: imageUrl || null,
      published,
    };

    const res = await fetch(
      isEditing ? `/api/events/${event.id}` : "/api/events",
      {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Event Title"
          placeholder="e.g. Neon Rooftop Party"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="Location"
          placeholder="Campus Quad, City Hall, etc."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Input
          label="Start Date &amp; Time"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Input
          label="End Date &amp; Time"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <Input
          label="Capacity (leave empty for unlimited)"
          type="number"
          placeholder="e.g. 100"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          min={1}
        />
        <Input
          label="Cover Image URL (optional)"
          type="url"
          placeholder="https://..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <Textarea
        label="Description"
        placeholder="What's the vibe? Tell attendees what to expect..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        required
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPublished(!published)}
          className={`w-12 h-6 rounded-full relative transition-colors ${
            published ? "bg-primary" : "bg-outline-variant"
          }`}
          aria-label="Toggle published"
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
              published ? "right-1" : "left-1"
            }`}
          />
        </button>
        <span className="text-sm font-medium">
          {published ? "Published (visible to all)" : "Draft (hidden)"}
        </span>
      </div>

      {error && (
        <p className="text-sm text-error bg-error-container/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex gap-4 pt-2">
        <Button
          type="submit"
          loading={loading}
          className="kinetic-gradient text-on-primary rounded-full px-8 py-3 font-bold shadow-glow"
        >
          {isEditing ? "Save Changes" : "Create Event"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          className="rounded-full px-8 py-3"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
