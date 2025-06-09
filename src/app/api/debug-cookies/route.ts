import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookies = request.cookies.getAll();
    const adminToken = request.cookies.get("admin-token")?.value;

    const cookieInfo = {
      allCookies: cookies.map((c) => ({
        name: c.name,
        hasValue: !!c.value,
        valueLength: c.value?.length || 0,
      })),
      adminTokenExists: !!adminToken,
      adminTokenLength: adminToken?.length || 0,
      userAgent: request.headers.get("user-agent"),
      host: request.headers.get("host"),
      referer: request.headers.get("referer"),
      forwarded: request.headers.get("x-forwarded-for"),
    };

    return NextResponse.json({
      success: true,
      cookieInfo,
      message: "معلومات الكوكيز",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "خطأ غير معروف",
      },
      { status: 500 },
    );
  }
}
