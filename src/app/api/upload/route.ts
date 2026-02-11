import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

// Magic bytes for image validation
const MAGIC_BYTES: Record<string, number[]> = {
  jpeg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
  gif: [0x47, 0x49, 0x46],
  // WebP: RIFF....WEBP
  webp: [0x52, 0x49, 0x46, 0x46],
};

function validateMagicBytes(buffer: Uint8Array, ext: string): boolean {
  const lower = ext.toLowerCase();

  // SVG is text-based — check for <svg tag
  if (lower === "svg") {
    const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer.slice(0, 1024));
    return text.includes("<svg");
  }

  // Map extension to magic key
  const keyMap: Record<string, string> = {
    jpg: "jpeg",
    jpeg: "jpeg",
    png: "png",
    gif: "gif",
    webp: "webp",
  };
  const key = keyMap[lower];
  if (!key) return false;

  const expected = MAGIC_BYTES[key];
  if (!expected) return false;

  for (let i = 0; i < expected.length; i++) {
    if (buffer[i] !== expected[i]) return false;
  }

  // Extra check for WebP: bytes 8-11 must be "WEBP"
  if (key === "webp") {
    if (buffer.length < 12) return false;
    const webpTag = String.fromCharCode(buffer[8], buffer[9], buffer[10], buffer[11]);
    if (webpTag !== "WEBP") return false;
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "지원하지 않는 파일 형식입니다. (jpg, png, gif, webp, svg)" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "파일 크기는 10MB 이하여야 합니다." }, { status: 400 });
    }

    // Extension whitelist check
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.includes(`.${ext}`)) {
      return NextResponse.json({ error: "허용되지 않는 파일 확장자입니다." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Magic bytes validation
    if (!validateMagicBytes(buffer, ext)) {
      return NextResponse.json({ error: "파일 내용이 확장자와 일치하지 않습니다." }, { status: 400 });
    }

    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "업로드에 실패했습니다." }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);

    return NextResponse.json({ url: urlData.publicUrl, fileName });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
