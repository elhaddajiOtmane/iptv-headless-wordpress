import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { path } = await req.json();
    
    if (path) {
      revalidatePath(path);
      console.log(`[ISR] Revalidated path: ${path}`);
      return NextResponse.json({ revalidated: true, now: Date.now(), path });
    }
    
    return NextResponse.json({ error: "No path provided" }, { status: 400 });
  } catch (err) {
    console.error("[ISR] Error revalidating:", err);
    return NextResponse.json({ error: "Error parsing request" }, { status: 500 });
  }
}
