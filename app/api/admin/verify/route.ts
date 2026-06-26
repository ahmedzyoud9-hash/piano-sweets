import { NextResponse } from "next/server";

// Verifies the admin password so the upload UI only appears after a correct
// entry. The real protection happens again server-side in /api/upload.
export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD غير مهيأ على الخادم." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: password === adminPassword });
}
