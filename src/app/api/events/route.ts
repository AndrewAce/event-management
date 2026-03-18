import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;

  const events = await prisma.event.findMany({
    where: {
      published: true,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { location: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { startDate: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { title, description, location, startDate, endDate, capacity, imageUrl, published } = body;

  if (!title || !description || !location || !startDate || !endDate) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      location,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      capacity: capacity ?? null,
      imageUrl: imageUrl ?? null,
      published: published ?? true,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
