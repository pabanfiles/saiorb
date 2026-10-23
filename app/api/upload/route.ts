import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 25MB limit validation
    const maxBytes = 25 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: "File exceeds 25MB maximum limit." },
        { status: 413 }
      );
    }

    // Return safe mock upload response (or R2 key in production)
    const fileKey = `upload_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    return NextResponse.json({
      success: true,
      fileKey,
      name: file.name,
      size: file.size,
      expiresIn: "3600s",
      url: `https://assets.saiorb.com/temp/${fileKey}`,
    });
  } catch (err) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
