import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  try {
    const { data, error } = await supabase.from("site_content").select("*");
    if (error) throw error;
    const result: Record<string, string> = {};
    data?.forEach((item: { id: string; value: string }) => {
      result[item.id] = item.value;
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }
    const body = await request.json();
    const { id, value } = body;
    if (!id || value === undefined) {
      return NextResponse.json({ error: "id와 value가 필요합니다." }, { status: 400 });
    }
    const { error } = await supabase
      .from("site_content")
      .upsert({ id, value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
