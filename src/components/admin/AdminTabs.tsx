"use client";

import { useRouter } from "next/navigation";

const tabs = [
  { id: "events", label: "Events", icon: "event" },
  { id: "users", label: "Users", icon: "group" },
  { id: "inquiries", label: "Partner Inquiries", icon: "handshake" },
];

export default function AdminTabs({ active }: { active: string }) {
  const router = useRouter();

  return (
    <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => router.push(`/admin?tab=${tab.id}`)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            active === tab.id
              ? "bg-surface-container-lowest shadow-soft text-on-surface"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-sm">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
