import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });

    // حذف كوكيز التوثيق
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // انتهاء فوري
    });

    return response;

  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تسجيل الخروج' },
      { status: 500 }
    );
  }
}
