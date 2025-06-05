import { type NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// التحقق من توفر إعدادات Cloudinary
const isCloudinaryAvailable = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'demo'
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // دعم رفع ملف واحد أو عدة ملفات
    const files = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File;

    console.log('📤 محاولة رفع ملف:', {
      singleFile: !!singleFile,
      singleFileName: singleFile?.name,
      singleFileType: singleFile?.type,
      multipleFiles: files.length,
      cloudinaryAvailable: isCloudinaryAvailable
    });

    let filesToProcess: File[] = [];

    if (singleFile) {
      filesToProcess = [singleFile];
    } else if (files && files.length > 0) {
      filesToProcess = files;
    }

    if (filesToProcess.length === 0) {
      console.log('❌ لم يتم تحديد أي ملفات');
      return NextResponse.json(
        { error: 'لم يتم تحديد أي ملفات' },
        { status: 400 }
      );
    }

    const uploadedFiles = [];

    // إعداد التخزين المحلي كـ fallback
    let uploadDir = '';
    if (!isCloudinaryAvailable) {
      uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
        console.log('📁 تم إنشاء مجلد uploads (fallback mode)');
      }
    }

    for (const file of filesToProcess) {
      if (!file || file.size === 0) {
        console.log('⚠️ تجاهل ملف فارغ');
        continue;
      }

      console.log('🔍 معالجة ملف:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      // التحقق من نوع الملف
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
        'video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime', 'video/x-msvideo'
      ];

      if (!allowedTypes.includes(file.type)) {
        console.log('❌ نوع ملف غير مدعوم:', file.type);
        continue;
      }

      // التحقق من حجم الملف
      const maxSize = isCloudinaryAvailable ? 100 * 1024 * 1024 : 50 * 1024 * 1024; // 100MB for Cloudinary, 50MB for local
      if (file.size > maxSize) {
        console.log('❌ ملف كبير جداً:', file.size);
        continue;
      }

      try {
        let uploadedFile;

        if (isCloudinaryAvailable) {
          // رفع إلى Cloudinary
          console.log('☁️ رفع إلى Cloudinary...');
          const result = await uploadToCloudinary(file, {
            folder: 'portfolio/projects',
            transformation: file.type.startsWith('video/') ? {
              quality: 'auto',
              fetch_format: 'auto',
            } : {
              quality: 'auto',
              fetch_format: 'auto',
              flags: 'progressive',
              width: 1200,
              height: 800,
              crop: 'limit'
            }
          });

          console.log('✅ تم رفع الملف إلى Cloudinary:', result.secure_url);

          uploadedFile = {
            originalName: file.name,
            fileName: result.public_id,
            src: result.secure_url,
            url: result.secure_url,
            type: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
            size: result.bytes,
            mimeType: file.type,
            width: result.width || null,
            height: result.height || null,
            duration: result.duration || null,
            cloudinary_public_id: result.public_id,
            cloudinary_url: result.secure_url,
            resource_type: result.resource_type,
            storage_type: 'cloudinary'
          };

          // التحقق من صحة النتيجة
          if (!uploadedFile.src) {
            throw new Error('لم يتم الحصول على رابط صحيح من Cloudinary');
          }

        } else {
          // رفع محلي (fallback)
          console.log('💾 رفع محلي (fallback mode)...');

          const timestamp = Date.now();
          const randomString = Math.random().toString(36).substring(2, 15);
          const fileExtension = path.extname(file.name);
          const fileName = `${timestamp}_${randomString}${fileExtension}`;

          const filePath = path.join(uploadDir, fileName);
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          await writeFile(filePath, buffer);
          console.log('✅ تم حفظ الملف محلياً:', fileName);

          uploadedFile = {
            originalName: file.name,
            fileName: fileName,
            src: `/uploads/${fileName}`,
            url: `/uploads/${fileName}`,
            type: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
            size: file.size,
            mimeType: file.type,
            storage_type: 'local'
          };
        }

        uploadedFiles.push(uploadedFile);

      } catch (uploadError) {
        console.error('❌ خطأ في رفع الملف:', uploadError);

        uploadedFiles.push({
          originalName: file.name,
          error: `فشل في رفع ${file.name}: ${uploadError instanceof Error ? uploadError.message : 'خطأ غير معروف'}`,
          type: 'ERROR'
        });
      }
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: 'لم يتم رفع أي ملفات بنجاح' },
        { status: 400 }
      );
    }

    // فصل الملفات الناجحة عن الخاطئة
    const successfulFiles = uploadedFiles.filter(file => file.type !== 'ERROR');
    const failedFiles = uploadedFiles.filter(file => file.type === 'ERROR');

    console.log('📊 نتيجة الرفع:', {
      successful: successfulFiles.length,
      failed: failedFiles.length,
      total: uploadedFiles.length,
      storageType: isCloudinaryAvailable ? 'cloudinary' : 'local'
    });

    return NextResponse.json({
      success: true,
      message: `تم رفع ${successfulFiles.length} ملف بنجاح${failedFiles.length > 0 ? ` و فشل ${failedFiles.length} ملف` : ''}`,
      files: successfulFiles,
      errors: failedFiles.length > 0 ? failedFiles : undefined,
      count: successfulFiles.length,
      storage_type: isCloudinaryAvailable ? 'cloudinary' : 'local'
    });

  } catch (error) {
    console.error('❌ خطأ عام في رفع الملفات:', error);
    return NextResponse.json(
      {
        error: 'حدث خطأ في رفع الملفات',
        details: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    );
  }
}
