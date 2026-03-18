import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminEventRow from "@/components/admin/AdminEventRow";
import AdminUserRow from "@/components/admin/AdminUserRow";
import AdminInquiryRow from "@/components/admin/AdminInquiryRow";
import AdminTabs from "@/components/admin/AdminTabs";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  await requireAdmin();

  const tab = searchParams.tab ?? "events";

  const [events, users, inquiries] = await Promise.all([
    prisma.event.findMany({
      orderBy: { startDate: "desc" },
      include: { _count: { select: { registrations: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        goals: { orderBy: { createdAt: "desc" } },
        registrations: {
          include: { event: { select: { id: true, title: true, startDate: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalRegistrations = events.reduce((sum, e) => sum + e._count.registrations, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-1">
            Admin Dashboard
          </h1>
          <p className="text-on-surface-variant">
            Manage events, users, and partner inquiries.
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 kinetic-gradient text-on-primary font-bold rounded-full px-6 py-3 shadow-glow hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Event
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Events",
            value: events.length,
            icon: "event",
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Registered Users",
            value: users.length,
            icon: "group",
            color: "text-secondary",
            bg: "bg-secondary/10",
          },
          {
            label: "Total Registrations",
            value: totalRegistrations,
            icon: "how_to_reg",
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            label: "Partner Inquiries",
            value: inquiries.length,
            icon: "handshake",
            color: "text-amber-600",
            bg: "bg-amber-100",
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

      {/* Tabs */}
      <AdminTabs active={tab} />

      {/* Events Tab */}
      {tab === "events" && (
        <div className="bg-surface-container-lowest rounded-lg shadow-soft border border-outline-variant/10 overflow-hidden">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-outline-variant block mb-3">
                event_busy
              </span>
              <p className="text-on-surface-variant font-medium">
                No events yet.{" "}
                <Link href="/admin/events/new" className="text-primary font-bold">
                  Create your first one.
                </Link>
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-surface-container-low border-b border-outline-variant/10">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Event
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden lg:table-cell">
                    Registrations
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {events.map((event) => (
                  <AdminEventRow key={event.id} event={event} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Users Tab */}
      {tab === "users" && (
        <div className="bg-surface-container-lowest rounded-lg shadow-soft border border-outline-variant/10 overflow-hidden">
          {users.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-outline-variant block mb-3">
                group_off
              </span>
              <p className="text-on-surface-variant font-medium">No users yet.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-surface-container-low border-b border-outline-variant/10">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden md:table-cell">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Activity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {users.map((user) => (
                  <AdminUserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Partner Inquiries Tab */}
      {tab === "inquiries" && (
        <div className="bg-surface-container-lowest rounded-lg shadow-soft border border-outline-variant/10 overflow-hidden">
          {inquiries.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-outline-variant block mb-3">
                inbox
              </span>
              <p className="text-on-surface-variant font-medium">
                No partner inquiries yet.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-surface-container-low border-b border-outline-variant/10">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Organisation
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden md:table-cell">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {inquiries.map((inquiry) => (
                  <AdminInquiryRow key={inquiry.id} inquiry={inquiry} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
