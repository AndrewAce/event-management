import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { orgName, contactName, email, phone, message } = await request.json();

  if (!orgName || !contactName || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const submission = await prisma.contactSubmission.create({
    data: {
      orgName,
      contactName,
      email,
      phone: phone || null,
      message,
    },
  });

  return NextResponse.json(submission, { status: 201 });
}

export async function GET() {
  // Admin-only: list all contact submissions
  // In production, add auth check for admin role
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(submissions);
}
