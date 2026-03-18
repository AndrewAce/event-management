import Link from "next/link";
import type { EventWithCount } from "@/types";

interface EventCardProps {
  event: EventWithCount;
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventCard({ event }: EventCardProps) {
  const spotsLeft =
    event.capacity != null
      ? event.capacity - event._count.registrations
      : null;

  return (
    <Link href={`/events/${event.id}`} className="group block">
      <div className="bg-surface-container-low rounded-lg p-3 hover:scale-[1.02] hover:bg-surface-container-lowest transition-all duration-300 shadow-soft h-full">
        {/* Image placeholder / cover */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-surface-container-highest">
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full kinetic-gradient opacity-30 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-primary/40">
                event
              </span>
            </div>
          )}

          {/* Registration indicator */}
          {event.isRegistered && (
            <div className="absolute top-3 right-3 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full">
              Registered
            </div>
          )}

          {/* Sold out badge */}
          {spotsLeft === 0 && (
            <div className="absolute top-3 left-3 bg-tertiary text-on-tertiary text-[10px] font-bold px-3 py-1 rounded-full">
              Full
            </div>
          )}
        </div>

        <div className="px-2 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-primary">
              {formatDate(event.startDate)}
            </span>
            {spotsLeft != null && spotsLeft > 0 && spotsLeft <= 10 && (
              <span className="text-[10px] font-bold text-tertiary">
                {spotsLeft} spots left
              </span>
            )}
            {spotsLeft == null && (
              <span className="text-[10px] font-bold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                FREE ENTRY
              </span>
            )}
          </div>

          <h3 className="text-lg font-extrabold mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {event.title}
          </h3>

          <div className="flex items-center gap-1 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-sm">
              location_on
            </span>
            <span className="font-medium line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-1 mt-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">group</span>
            <span>{event._count.registrations} registered</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
