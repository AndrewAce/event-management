import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import EventCard from "@/components/events/EventCard";
import type { EventWithCount } from "@/types";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const user = await getCurrentUser();
  const search = searchParams.q ?? "";

  const events = await prisma.event.findMany({
    where: {
      published: true,
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { location: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { startDate: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  // Mark which events the user is registered for
  let registeredEventIds = new Set<string>();
  if (user) {
    const registrations = await prisma.registration.findMany({
      where: { userId: user.id },
      select: { eventId: true },
    });
    registeredEventIds = new Set(registrations.map((r) => r.eventId));
  }

  const eventsWithStatus: EventWithCount[] = events.map((event) => ({
    ...event,
    isRegistered: registeredEventIds.has(event.id),
  }));

  const upcoming = eventsWithStatus.filter(
    (e) => new Date(e.startDate) >= new Date()
  );
  const past = eventsWithStatus.filter(
    (e) => new Date(e.startDate) < new Date()
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          Explore Events
        </h1>
        <p className="text-on-surface-variant text-lg font-medium">
          Find your next adventure in the community.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mb-10">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
          search
        </span>
        <form method="GET">
          <input
            name="q"
            defaultValue={search}
            type="text"
            placeholder="Search events or location..."
            className="w-full bg-surface-container-low border-none rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </form>
      </div>

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-7 bg-primary rounded-full inline-block" />
            Upcoming
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Past Events */}
      {past.length > 0 && (
        <section>
          <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-7 bg-outline rounded-full inline-block" />
            Past Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-75">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {eventsWithStatus.length === 0 && (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-6xl text-outline-variant block mb-4">
            event_busy
          </span>
          <h3 className="text-xl font-bold text-on-surface-variant">
            No events found
          </h3>
          <p className="text-on-surface-variant mt-2">
            {search
              ? `No results for "${search}". Try a different search.`
              : "Check back soon for upcoming events."}
          </p>
        </div>
      )}
    </div>
  );
}
