import Link from "next/link";
import { prisma } from "@/lib/prisma";
import EventCard from "@/components/events/EventCard";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  { label: "Games", icon: "sports_esports" },
  { label: "Carnivals", icon: "festival" },
  { label: "Camps", icon: "camping" },
  { label: "Music", icon: "music_note" },
  { label: "Sports", icon: "sports_basketball" },
  { label: "Workshops", icon: "brush" },
];

export default async function HomePage() {
  const events = await prisma.event.findMany({
    where: { published: true, startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    take: 8,
    include: { _count: { select: { registrations: true } } },
  });

  const featuredEvent = events[0] ?? null;
  const trendingEvents = events.slice(1, 5);
  const moreEvents = events.slice(5);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="px-6 max-w-7xl mx-auto py-10 mb-16">
        <div className="relative rounded-lg overflow-hidden min-h-[580px] flex items-center px-10">
          {/* Background */}
          <div className="absolute inset-0 kinetic-gradient opacity-80" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface/80 via-inverse-surface/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Find Your Next
              <br />
              <span className="text-primary-container">
                Community Adventure
              </span>
            </h1>
            <p className="text-xl text-surface-container-low mb-10 leading-relaxed font-medium">
              Join the pulse of your community. From carnivals to workshops,
              discover experiences that shape your journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/events"
                className="px-10 py-4 kinetic-gradient text-on-primary font-bold rounded-full text-lg shadow-glow-lg hover:scale-105 transition-all"
              >
                Browse Events
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/20 transition-all"
              >
                Host an Event
              </Link>
            </div>
          </div>

          {/* Live badge */}
          <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-end">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl p-4 rounded-lg border border-white/20">
              <div className="w-3 h-3 bg-tertiary rounded-full pulse-live" />
              <span className="text-white font-bold uppercase tracking-widest text-xs">
                {events.length} Events Live Now
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trending Events ── */}
      {trendingEvents.length > 0 && (
        <section className="mb-24 overflow-hidden">
          <div className="px-6 max-w-7xl mx-auto flex items-end justify-between mb-8">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-1">
                Trending Now
              </h2>
              <p className="text-on-surface-variant font-medium">
                What everyone&apos;s talking about this week.
              </p>
            </div>
            <Link
              href="/events"
              className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
            >
              View all
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="flex gap-6 px-6 overflow-x-auto hide-scrollbar pb-4">
            {trendingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="flex-shrink-0 w-72 group cursor-pointer"
              >
                <div className="relative h-[380px] rounded-lg overflow-hidden shadow-soft transition-all group-hover:scale-[1.02] bg-surface-container-highest">
                  {event.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full kinetic-gradient opacity-50" />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-primary">
                    {new Date(event.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white text-xl font-extrabold line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">
                      {event.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Categories ── */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <h2 className="text-4xl font-extrabold tracking-tight mb-10 text-center">
          Explore by Category
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={`/events?q=${cat.label.toLowerCase()}`}
              className="bg-surface-container-high p-6 rounded-lg flex flex-col items-center justify-center text-center gap-3 hover:bg-primary-container transition-colors group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-soft">
                <span className="material-symbols-outlined text-3xl">
                  {cat.icon}
                </span>
              </div>
              <span className="font-bold text-sm">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured / More Events ── */}
      {(featuredEvent || moreEvents.length > 0) && (
        <section className="bg-surface-container px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-extrabold tracking-tight">
                Happening in the Community
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredEvent && (
                <EventCard event={featuredEvent} />
              )}
              {moreEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 kinetic-gradient text-on-primary font-bold rounded-full px-8 py-4 shadow-glow hover:opacity-90 transition-all"
              >
                See all events
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section className="px-6 max-w-7xl mx-auto py-24">
        <div className="relative rounded-lg overflow-hidden bg-inverse-surface p-12 md:p-20 text-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #b28cff 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to Shift Your Vibe?
            </h2>
            <p className="text-surface-container-low text-xl max-w-2xl mx-auto mb-12">
              Join thousands of youths discovering community events, building
              friendships, and growing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/auth/register"
                className="px-10 py-4 kinetic-gradient text-on-primary font-bold rounded-full text-lg shadow-glow-lg hover:scale-105 transition-all"
              >
                Get Started Free
              </Link>
              <Link
                href="/events"
                className="px-10 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/20 transition-all"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
