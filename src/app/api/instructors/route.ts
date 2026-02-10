import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("service_id");
    const query = supabase.from("instructors").select("*").order("sort_order");
    const { data, error } = await query;
    if (error) throw error;
    let result = data || [];
    // service_id 필터 → service_ids 배열에서 검색
    if (serviceId) {
      const sid = parseInt(serviceId);
      result = result.filter((i: Record<string, unknown>) => {
        const ids = i.service_ids as number[] | null;
        return ids && ids.includes(sid);
      });
    }
    return NextResponse.json(result);
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
    // id=0과 service_id(존재하지 않는 컬럼) 제거
    const { id, service_id, ...insertData } = body;
    void id; void service_id;

    const instructorData = {
      ...insertData,
      instructor_code: insertData.instructor_code || `INST${Date.now()}`,
    };

    const { data, error } = await supabase.from("instructors").insert(instructorData).select().single();
    if (error) {
      return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }
    const body = await request.json();
    const { id, service_id, ...updateData } = body;
    void service_id;
    if (id == null) {
      return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("instructors")
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
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
    const { error } = await supabase.from("instructors").delete().eq("id", parseInt(id));
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
