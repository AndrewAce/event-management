import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EventForm from "@/components/events/EventForm";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();

  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Edit Event
        </h1>
        <p className="text-on-surface-variant">{event.title}</p>
      </div>

      <div className="bg-surface-container-lowest rounded-lg p-8 shadow-soft border border-outline-variant/10">
        <EventForm event={event} />
      </div>
    </div>
  );
}
