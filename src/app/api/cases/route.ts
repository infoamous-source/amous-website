import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");
    let query = supabase.from("cases").select("*").eq("is_published", true).order("created_at", { ascending: false });
    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }
    const body = await request.json();
    const { data, error } = await supabase.from("cases").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("cases")
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
    }
    const { error } = await supabase.from("cases").delete().eq("id", parseInt(id));
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
