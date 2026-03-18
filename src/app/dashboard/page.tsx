import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import GoalCard from "@/components/dashboard/GoalCard";
import GoalForm from "@/components/dashboard/GoalForm";
import EventCard from "@/components/events/EventCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireAuth();

  const [goals, registrations] = await Promise.all([
    prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.registration.findMany({
      where: { userId: user.id },
      include: {
        event: { include: { _count: { select: { registrations: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const now = new Date();
  const upcomingRegistrations = registrations.filter(
    (r) => new Date(r.event.startDate) >= now
  );
  const pastRegistrations = registrations.filter(
    (r) => new Date(r.event.startDate) < now
  );

  const completedGoals = goals.filter((g) => g.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Welcome header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-1">
          Hey, {user.name ?? "there"} 👋
        </h1>
        <p className="text-on-surface-variant">
          Track your goals and upcoming events.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          {
            label: "Goals Set",
            value: goals.length,
            icon: "flag",
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Completed",
            value: completedGoals,
            icon: "check_circle",
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            label: "Events Joined",
            value: registrations.length,
            icon: "event",
            color: "text-secondary",
            bg: "bg-secondary/10",
          },
          {
            label: "Upcoming",
            value: upcomingRegistrations.length,
            icon: "upcoming",
            color: "text-tertiary",
            bg: "bg-tertiary/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest rounded-lg p-5 shadow-soft border border-outline-variant/10"
          >
            <div
              className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-3`}
            >
              <span className={`material-symbols-outlined ${stat.color}`}>
                {stat.icon}
              </span>
            </div>
            <p className="text-2xl font-extrabold">{stat.value}</p>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Goals column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <span className="w-1.5 h-7 bg-primary rounded-full inline-block" />
              My Goals
            </h2>
          </div>

          <GoalForm />

          {goals.length === 0 ? (
            <p className="text-on-surface-variant text-sm text-center py-8">
              No goals yet. Add your first one above!
            </p>
          ) : (
            <div className="space-y-3">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </div>

        {/* Events column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Upcoming events */}
          <div>
            <h2 className="text-2xl font-extrabold flex items-center gap-2 mb-5">
              <span className="w-1.5 h-7 bg-secondary rounded-full inline-block" />
              Upcoming Events
            </h2>

            {upcomingRegistrations.length === 0 ? (
              <div className="text-center py-10 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-4xl text-outline-variant block mb-2">
                  event_upcoming
                </span>
                <p className="text-on-surface-variant text-sm mb-4">
                  You have no upcoming events.
                </p>
                <Link
                  href="/events"
                  className="text-primary font-bold text-sm hover:underline"
                >
                  Browse events →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upcomingRegistrations.map((r) => (
                  <EventCard
                    key={r.event.id}
                    event={{ ...r.event, isRegistered: true }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Past events */}
          {pastRegistrations.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold flex items-center gap-2 mb-5">
                <span className="w-1.5 h-7 bg-outline rounded-full inline-block" />
                Past Events
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-70">
                {pastRegistrations.map((r) => (
                  <EventCard
                    key={r.event.id}
                    event={{ ...r.event, isRegistered: true }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
