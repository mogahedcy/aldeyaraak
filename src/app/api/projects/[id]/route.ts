import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - جلب مشروع محدد
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        mediaItems: {
          orderBy: { order: 'asc' }
        },
        tags: true,
        materials: true,
        comments: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            comments: true,
            mediaItems: true
          }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // زيادة عدد المشاهدات
    await prisma.project.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

    return NextResponse.json(project);

  } catch (error) {
    console.error('خطأ في جلب المشروع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المشروع' },
      { status: 500 }
    );
  }
}

// PUT - تحديث مشروع
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

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

    // حذف العلاقات القديمة
    await prisma.mediaItem.deleteMany({
      where: { projectId: id }
    });

    await prisma.projectTag.deleteMany({
      where: { projectId: id }
    });

    await prisma.projectMaterial.deleteMany({
      where: { projectId: id }
    });

    // تحديث المشروع مع العلاقات الجديدة
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        category,
        location,
        completionDate: new Date(completionDate),
        client: client || null,
        featured: featured || false,
        projectDuration,
        projectCost,
        mediaItems: {
          create: mediaItems?.map((item: any, index: number) => ({
            type: item.type,
            src: item.src,
            thumbnail: item.thumbnail,
            title: item.title,
            description: item.description,
            duration: item.duration,
            order: index
          })) || []
        },
        tags: {
          create: tags?.map((tag: string) => ({ name: tag })) || []
        },
        materials: {
          create: materials?.map((material: string) => ({ name: material })) || []
        }
      },
      include: {
        mediaItems: true,
        tags: true,
        materials: true
      }
    });

    return NextResponse.json({
      success: true,
      project,
      message: 'تم تحديث المشروع بنجاح'
    });

  } catch (error) {
    console.error('خطأ في تحديث المشروع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث المشروع' },
      { status: 500 }
    );
  }
}

// DELETE - حذف مشروع
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'تم حذف المشروع بنجاح'
    });

  } catch (error) {
    console.error('خطأ في حذف المشروع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف المشروع' },
      { status: 500 }
    );
  }
}
