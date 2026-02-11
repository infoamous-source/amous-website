import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, organization, phone, email, interests, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요. (이름, 연락처, 이메일, 문의내용)" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("inquiries").insert({
      name,
      organization: organization || null,
      phone,
      email,
      interests: interests || [],
      message,
    });

    if (error) {
      console.error("Contact insert error:", error);
      return NextResponse.json({ error: "문의 등록에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
