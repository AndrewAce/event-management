import type { Event, User, Registration, Goal } from "@prisma/client";

export type { Event, User, Registration, Goal };

export type EventWithRegistrations = Event & {
  registrations: Registration[];
};

export type EventWithCount = Event & {
  _count: { registrations: number };
  isRegistered?: boolean;
};
