import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import EventRegistrationButton from "@/components/events/EventRegistrationButton";
import EventCard from "@/components/events/EventCard";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [event, user] = await Promise.all([
    prisma.event.findUnique({
      where: { id: params.id, published: true },
      include: { _count: { select: { registrations: true } } },
    }),
    getCurrentUser(),
  ]);

  if (!event) notFound();

  let isRegistered = false;
  if (user) {
    const reg = await prisma.registration.findUnique({
      where: { userId_eventId: { userId: user.id, eventId: event.id } },
    });
    isRegistered = !!reg;
  }

  const isFull =
    event.capacity != null &&
    event._count.registrations >= event.capacity;

  const spotsLeft = event.capacity != null
    ? event.capacity - event._count.registrations
    : null;

  // Related events
  const related = await prisma.event.findMany({
    where: { published: true, id: { not: event.id } },
    orderBy: { startDate: "asc" },
    take: 3,
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero + Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Cover Image */}
        <div className="lg:col-span-8 group relative overflow-hidden rounded-lg shadow-2xl bg-surface-container-highest min-h-[400px]">
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[400px] kinetic-gradient opacity-40 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-white/60">
                event
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/40 to-transparent" />
        </div>

        {/* Event meta */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-5">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            {event.title}
          </h1>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Date &amp; Time
                </p>
                <p className="font-bold text-sm">{formatDate(event.startDate)}</p>
                <p className="text-on-surface-variant text-sm">
                  {formatTime(event.startDate)} — {formatTime(event.endDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Location
                </p>
                <p className="font-bold text-sm">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary flex-shrink-0">
                <span className="material-symbols-outlined">group</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Attendance
                </p>
                <p className="font-bold text-sm">
                  {event._count.registrations} registered
                  {event.capacity && ` / ${event.capacity} capacity`}
                </p>
                {spotsLeft != null && spotsLeft > 0 && (
                  <p className="text-xs text-tertiary font-semibold">
                    {spotsLeft} spots left
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Description */}
        <div className="lg:col-span-8 space-y-10">
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full" />
              About the Event
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </section>
        </div>

        {/* Sticky CTA Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 p-8 rounded-lg bg-surface-container-highest shadow-glow border border-primary/10">
            <div className="mb-6">
              <p className="text-sm font-bold text-on-surface-variant uppercase mb-1">
                Admission
              </p>
              <p className="text-4xl font-extrabold text-primary">
                Free Entry
              </p>
            </div>

            <EventRegistrationButton
              eventId={event.id}
              isRegistered={isRegistered}
              isAuthenticated={!!user}
              isFull={isFull}
            />

            <p className="mt-4 text-xs text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[12px] align-middle mr-1">
                info
              </span>
              Registration closes on {formatDate(event.endDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Related Events */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-outline-variant/20 pt-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
                Keep the vibe going
              </p>
              <h2 className="text-4xl font-extrabold">Related Events</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
