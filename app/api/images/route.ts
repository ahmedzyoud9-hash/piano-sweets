import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const OWNER = "ahmedzyoud9-hash";
const REPO = "piano-sweets";
const BRANCH = "main";
const DIR = "public/products/uploads";

// Lists uploaded images from the repo via the GitHub Contents API. Uses each
// file's download_url so images show immediately, before the redeploy lands.
// Fails soft to an empty list so the public gallery just hides itself.
export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${DIR}?ref=${BRANCH}`,
      { headers, cache: "no-store" }
    );

    if (!res.ok) return NextResponse.json({ images: [] });

    const data = await res.json();
    const images = (Array.isArray(data) ? data : [])
      .filter(
        (f) => f.type === "file" && /\.(jpe?g|png|webp|avif)$/i.test(f.name)
      )
      // Filenames are timestamp-prefixed, so reverse-sorting = newest first.
      .sort((a, b) => b.name.localeCompare(a.name))
      .map((f) => ({ url: f.download_url as string, pathname: f.name as string }));

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
