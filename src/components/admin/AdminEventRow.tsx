"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Event } from "@/types";

interface AdminEventRowProps {
  event: Event & { _count: { registrations: number } };
}

export default function AdminEventRow({ event }: AdminEventRowProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${event.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/events/${event.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <tr className="hover:bg-surface-container-low transition-colors">
      <td className="px-6 py-4">
        <div>
          <p className="font-bold text-sm line-clamp-1">{event.title}</p>
          <p className="text-xs text-on-surface-variant line-clamp-1">
            {event.location}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <span className="text-sm text-on-surface-variant">
          {new Date(event.startDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <span className="text-sm font-medium">
          {event._count.registrations}
          {event.capacity && (
            <span className="text-on-surface-variant">
              {" "}/ {event.capacity}
            </span>
          )}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
            event.published
              ? "bg-green-100 text-green-800"
              : "bg-surface-container-highest text-on-surface-variant"
          }`}
        >
          {event.published ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/events/${event.id}`}
            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            title="View"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
          </Link>
          <Link
            href={`/admin/events/${event.id}/edit`}
            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 rounded-lg text-on-surface-variant hover:text-tertiary hover:bg-tertiary/10 transition-colors disabled:opacity-50"
            title="Delete"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
