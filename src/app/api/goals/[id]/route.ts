import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { completed, title, description } = await request.json();

  const goal = await prisma.goal.updateMany({
    where: { id: params.id, userId: user.id },
    data: {
      ...(completed !== undefined && { completed }),
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
    },
  });

  return NextResponse.json(goal);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.goal.deleteMany({
    where: { id: params.id, userId: user.id },
  });

  return NextResponse.json({ success: true });
}
