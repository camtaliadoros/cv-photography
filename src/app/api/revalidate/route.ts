import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Called by a Sanity webhook whenever a document is published, so edits in
 * the Studio show on the site straight away instead of after the hourly
 * cache refresh. Every sanityFetch is tagged with the document types it
 * reads, so purging the published document's type refreshes exactly the
 * pages that use it.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured" }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
  if (!isValidSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ error: "Missing document type" }, { status: 400 });
  }

  // Expire outright rather than serving stale while refreshing: after a
  // publish, the very next visit should show the change.
  revalidateTag(body._type, { expire: 0 });
  return NextResponse.json({ revalidated: body._type });
}
