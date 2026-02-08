import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase.from("site_content").select("*");
    if (error) {
      return NextResponse.json({ _error: error.message, _count: 0 }, { status: 500 });
    }
    const result: Record<string, string> = {};
    data?.forEach((item: { id: string; value: string }) => {
      result[item.id] = item.value;
    });
    result._count = String(data?.length || 0);
    result._url = process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(-10) || "unknown";
    result._key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(-8) || "unknown";
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ _error: String(e) }, { status: 500 });
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
    // 먼저 기존 row가 있는지 확인
    const { data: existing } = await supabase
      .from("site_content")
      .select("id")
      .eq("id", id)
      .single();

    let error;
    if (existing) {
      // UPDATE
      const result = await supabase
        .from("site_content")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("id", id);
      error = result.error;
    } else {
      // INSERT
      const result = await supabase
        .from("site_content")
        .insert({ id, value, updated_at: new Date().toISOString() });
      error = result.error;
    }
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
