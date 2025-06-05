import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - جلب جميع المشاريع
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');
    const sort = searchParams.get('sort'); // newest, oldest, featured, popular

    const skip = page ? (Number.parseInt(page) - 1) * (limit ? Number.parseInt(limit) : 12) : 0;
    const take = limit ? Number.parseInt(limit) : 12;

    const where: any = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    // تحديد ترتيب المشاريع
    let orderBy: any[] = [];
    switch (sort) {
      case 'newest':
        orderBy = [{ createdAt: 'desc' }];
        break;
      case 'oldest':
        orderBy = [{ createdAt: 'asc' }];
        break;
      case 'featured':
        orderBy = [{ featured: 'desc' }, { createdAt: 'desc' }];
        break;
      case 'popular':
        orderBy = [{ views: 'desc' }, { likes: 'desc' }, { createdAt: 'desc' }];
        break;
      default:
        orderBy = [{ featured: 'desc' }, { createdAt: 'desc' }];
    }

    console.log('🔍 جلب المشاريع مع المعايير:', { where, skip, take, sort, orderBy });

    const projects = await prisma.project.findMany({
      where,
      include: {
        mediaItems: {
          orderBy: { order: 'asc' }
        },
        tags: true,
        materials: true,
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy,
      skip,
      take
    });

    // تحويل البيانات لتتوافق مع التنسيق المطلوب
    const formattedProjects = projects.map(project => ({
      ...project,
      views: project.views || 0,
      likes: project.likes || 0,
      rating: project.rating || 0
    }));

    console.log('📊 المشاريع المجلبة:', {
      count: projects.length,
      projects: projects.map(p => ({
        id: p.id,
        title: p.title,
        mediaCount: p.mediaItems.length,
        mediaTypes: p.mediaItems.map(m => m.type)
      }))
    });

    const totalCount = await prisma.project.count({ where });

    return NextResponse.json({
      success: true,
      projects: formattedProjects,
      total: totalCount,
      pagination: {
        total: totalCount,
        page: page ? Number.parseInt(page) : 1,
        limit: take,
        totalPages: Math.ceil(totalCount / take)
      }
    });

  } catch (error) {
    console.error('❌ خطأ في جلب المشاريع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المشاريع' },
      { status: 500 }
    );
  }
}

// POST - إضافة مشروع جديد
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('🔍 البيانات المستلمة:', JSON.stringify(data, null, 2));

    const {
      title,
      description,
      category,
      location,
      completionDate,
      client,
      featured,
      projectDuration,
      projectCost,
      mediaItems,
      tags,
      materials
    } = data;

    console.log('🎥 عناصر الوسائط المستلمة:', mediaItems);

    // التحقق من صحة البيانات
    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: 'البيانات الأساسية مطلوبة' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        category,
        location,
        completionDate: new Date(completionDate),
        client: client || null,
        featured: featured || false,
        projectDuration: projectDuration || '',
        projectCost: projectCost || '',
        mediaItems: {
          create: mediaItems?.map((item: any, index: number) => {
            console.log(`📁 معالجة ملف ${index + 1}:`, item);

            // التحقق من وجود src المطلوب
            if (!item.src) {
              throw new Error(`الملف ${index + 1} لا يحتوي على رابط صحيح`);
            }

            return {
              type: item.type,
              src: item.src,
              thumbnail: item.thumbnail || item.src,
              title: item.title || `ملف ${index + 1}`,
              description: item.description || '',
              duration: item.duration || null,
              order: index
            };
          }) || []
        },
        tags: {
          create: tags?.map((tag: any) => ({ 
            name: typeof tag === 'string' ? tag : tag.name 
          })) || []
        },
        materials: {
          create: materials?.map((material: any) => ({ 
            name: typeof material === 'string' ? material : material.name 
          })) || []
        }
      },
      include: {
        mediaItems: true,
        tags: true,
        materials: true
      }
    });

    console.log('✅ تم إنشاء المشروع بنجاح:', {
      id: project.id,
      title: project.title,
      mediaCount: project.mediaItems.length,
      mediaItems: project.mediaItems
    });

    // إشعار جوجل بالمحتوى الجديد
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sitemap/refresh`, {
        method: 'POST'
      });
    } catch (error) {
      console.warn('تعذر إشعار جوجل بالمحتوى الجديد:', error);
    }

    return NextResponse.json({
      success: true,
      project,
      message: 'تم إضافة المشروع بنجاح'
    });

  } catch (error) {
    console.error('❌ خطأ في إضافة المشروع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إضافة المشروع' },
      { status: 500 }
    );
  }
}