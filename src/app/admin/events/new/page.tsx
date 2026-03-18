import { requireAdmin } from "@/lib/auth";
import EventForm from "@/components/events/EventForm";

export default async function NewEventPage() {
  await requireAdmin();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Create New Event
        </h1>
        <p className="text-on-surface-variant">
          Fill in the details to publish a new event.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-lg p-8 shadow-soft border border-outline-variant/10">
        <EventForm />
      </div>
    </div>
  );
}
