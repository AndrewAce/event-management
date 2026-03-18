"use client";

import { useState } from "react";
import type { Goal } from "@/types";

interface UserWithDetails {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
  goals: Goal[];
  registrations: {
    event: { id: string; title: string; startDate: Date };
  }[];
}

export default function AdminUserRow({ user }: { user: UserWithDetails }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = user.goals.length > 0 || user.registrations.length > 0;

  return (
    <>
      <tr className="hover:bg-surface-container-low transition-colors">
        {/* User */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full kinetic-gradient flex items-center justify-center text-on-primary text-xs font-bold shrink-0">
              {(user.name ?? user.email)[0].toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-sm">{user.name ?? "—"}</p>
              <p className="text-xs text-on-surface-variant">{user.email}</p>
            </div>
          </div>
        </td>

        {/* Role */}
        <td className="px-6 py-4 hidden md:table-cell">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
              user.role === "ADMIN"
                ? "bg-primary/10 text-primary"
                : "bg-surface-container-highest text-on-surface-variant"
            }`}
          >
            {user.role}
          </span>
        </td>

        {/* Joined */}
        <td className="px-6 py-4 hidden lg:table-cell">
          <span className="text-sm text-on-surface-variant">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </td>

        {/* Expand */}
        <td className="px-6 py-4">
          {hasDetails ? (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-sm">
                {expanded ? "expand_less" : "expand_more"}
              </span>
              {user.registrations.length} event{user.registrations.length !== 1 ? "s" : ""},{" "}
              {user.goals.length} goal{user.goals.length !== 1 ? "s" : ""}
            </button>
          ) : (
            <span className="text-xs text-on-surface-variant">No activity</span>
          )}
        </td>
      </tr>

      {expanded && (
        <tr className="bg-surface-container-low">
          <td colSpan={4} className="px-6 py-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Events attended */}
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  Events Attended
                </p>
                {user.registrations.length === 0 ? (
                  <p className="text-sm text-on-surface-variant">No registrations yet.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {user.registrations.map((reg) => (
                      <li key={reg.event.id} className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-sm text-primary">
                          event
                        </span>
                        <span className="font-medium">{reg.event.title}</span>
                        <span className="text-xs text-on-surface-variant">
                          {new Date(reg.event.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Goals */}
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  Goals
                </p>
                {user.goals.length === 0 ? (
                  <p className="text-sm text-on-surface-variant">No goals set.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {user.goals.map((goal) => (
                      <li key={goal.id} className="flex items-start gap-2 text-sm">
                        <span
                          className={`material-symbols-outlined text-sm mt-0.5 ${
                            goal.completed ? "text-green-600" : "text-outline-variant"
                          }`}
                        >
                          {goal.completed ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <div>
                          <span className={goal.completed ? "line-through text-on-surface-variant" : "font-medium"}>
                            {goal.title}
                          </span>
                          {goal.description && (
                            <p className="text-xs text-on-surface-variant">{goal.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
