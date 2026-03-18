import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { _count: { select: { registrations: true } } },
  });

  if (!event) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { title, description, location, startDate, endDate, capacity, imageUrl, published } = body;

  const event = await prisma.event.update({
    where: { id: params.id },
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

  return NextResponse.json(event);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await prisma.event.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
