import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OWNER = "ahmedzyoud9-hash";
const REPO = "piano-sweets";
const BRANCH = "main";
const PATH = "content/site.json";

const GH = "https://api.github.com";

function ghHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

// Reads the live site content straight from the repo so the admin editor always
// shows the current values (before the redeploy that a save triggers lands).
export async function GET() {
  try {
    const res = await fetch(
      `${GH}/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`,
      { headers: ghHeaders(), cache: "no-store" }
    );
    if (!res.ok) return NextResponse.json({ content: null, sha: null });
    const data = await res.json();
    const decoded = Buffer.from(data.content ?? "", "base64").toString("utf-8");
    return NextResponse.json({ content: JSON.parse(decoded), sha: data.sha });
  } catch {
    return NextResponse.json({ content: null, sha: null });
  }
}

// Saves the edited content back into content/site.json, committing via the
// GitHub Contents API. Verifies the admin password first. The commit triggers a
// redeploy, after which the public site reflects the change.
export async function POST(request: Request) {
  try {
    const { password, content } = (await request.json()) as {
      password?: string;
      content?: unknown;
    };

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
    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "محتوى غير صالح." }, { status: 400 });
    }

    // Fetch the current file SHA (required by the Contents API to update).
    let sha: string | undefined;
    const current = await fetch(
      `${GH}/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`,
      { headers: ghHeaders(), cache: "no-store" }
    );
    if (current.ok) {
      const data = await current.json();
      sha = data.sha;
    }

    const body = JSON.stringify(content, null, 2) + "\n";
    const base64 = Buffer.from(body, "utf-8").toString("base64");

    const res = await fetch(`${GH}/repos/${OWNER}/${REPO}/contents/${PATH}`, {
      method: "PUT",
      headers: ghHeaders(),
      body: JSON.stringify({
        message: "Update site content via admin panel",
        content: base64,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: `فشل الحفظ على GitHub (${res.status}). ${detail.slice(0, 120)}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "فشل الحفظ." },
      { status: 500 }
    );
  }
}
