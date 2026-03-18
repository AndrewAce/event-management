"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Goal } from "@/types";

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleComplete() {
    setLoading(true);
    await fetch(`/api/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !goal.completed }),
    });
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/goals/${goal.id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <div
      className={`bg-surface-container-lowest rounded-lg p-5 shadow-soft border border-outline-variant/10 transition-all ${
        goal.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={toggleComplete}
          disabled={loading}
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
            goal.completed
              ? "bg-primary border-primary"
              : "border-outline hover:border-primary"
          }`}
          aria-label={goal.completed ? "Mark incomplete" : "Mark complete"}
        >
          {goal.completed && (
            <span className="material-symbols-outlined text-white text-sm">
              check
            </span>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-sm ${
              goal.completed ? "line-through text-on-surface-variant" : ""
            }`}
          >
            {goal.title}
          </h3>
          {goal.description && (
            <p className="text-xs text-on-surface-variant mt-1">
              {goal.description}
            </p>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-outline hover:text-tertiary transition-colors p-1 rounded"
          aria-label="Delete goal"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    </div>
  );
}
