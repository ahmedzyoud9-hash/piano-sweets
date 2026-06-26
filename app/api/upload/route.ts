import { NextResponse } from "next/server";

export const runtime = "nodejs";

const OWNER = "ahmedzyoud9-hash";
const REPO = "piano-sweets";
const BRANCH = "main";
const DIR = "public/products/uploads";

// Free storage: uploaded images are committed straight into the repo via the
// GitHub Contents API. The admin password is verified server-side first.
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const password = form.get("password");
    const file = form.get("file");

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD غير مهيأ على الخادم." },
        { status: 500 }
      );
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "كلمة السر غير صحيحة." }, { status: 401 });
    }
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN غير مهيأ على الخادم." },
        { status: 500 }
      );
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "لم يتم إرسال ملف." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const safeName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const path = `${DIR}/${safeName}`;

    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          message: `Upload product image ${safeName}`,
          content: base64,
          branch: BRANCH,
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: `فشل الحفظ على GitHub (${res.status}). ${detail.slice(0, 120)}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      ok: true,
      url: data?.content?.download_url ?? null,
      name: safeName,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "فشل الرفع." },
      { status: 500 }
    );
  }
}
