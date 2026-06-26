import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Returns the uploaded product images (newest first). Fails soft to an empty
// list so the public gallery simply hides itself when Blob isn't configured.
export async function GET() {
  try {
    const { blobs } = await list({ prefix: "products/" });
    const images = blobs
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )
      .map((b) => ({ url: b.url, pathname: b.pathname }));
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
