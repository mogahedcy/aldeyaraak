import { type NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'غير مصرح بالدخول' },
        { status: 401 }
      );
    }

    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

    // البحث عن المستخدم
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: {
        id: true,
        username: true,
        email: true,
        lastLogin: true
      }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin,
      authenticated: true
    });

  } catch (error) {
    console.error('خطأ في التحقق من التوثيق:', error);
    return NextResponse.json(
      { error: 'توكن غير صالح' },
      { status: 401 }
    );
  }
}
