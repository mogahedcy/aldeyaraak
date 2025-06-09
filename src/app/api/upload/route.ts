import { type NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// التحقق من توفر إعدادات Cloudinary
const isCloudinaryAvailable = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== "demo",
);

// إعدادات محسنة للرفع
const UPLOAD_CONFIG = {
  maxFileSize: {
    image: 20 * 1024 * 1024, // 20MB للصور
    video: 100 * 1024 * 1024, // 100MB للفيديو
  },
  allowedTypes: {
    image: ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"],
    video: [
      "video/mp4",
      "video/mov",
      "video/avi",
      "video/webm",
      "video/quicktime",
    ],
  },
};

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 بدء عملية رفع الملفات...");

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File;

    let filesToProcess: File[] = [];
    if (singleFile) {
      filesToProcess = [singleFile];
    } else if (files && files.length > 0) {
      filesToProcess = files;
    }

    if (filesToProcess.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "لم يتم تحديد أي ملفات للرفع",
        },
        { status: 400 },
      );
    }

    console.log(`📋 سيتم رفع ${filesToProcess.length} ملف`);

    // إعداد مجلد التحميل المحلي كـ backup
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const results = [];

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];

      console.log(
        `📤 معالجة ملف ${i + 1}/${filesToProcess.length}: ${file.name}`,
      );

      try {
        // التحقق من نوع الملف
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isVideo && !isImage) {
          throw new Error(`نوع الملف غير مدعوم: ${file.type}`);
        }

        // التحقق من الأنواع المسموحة
        const allowedTypes = isVideo
          ? UPLOAD_CONFIG.allowedTypes.video
          : UPLOAD_CONFIG.allowedTypes.image;
        if (!allowedTypes.includes(file.type)) {
          throw new Error(`نوع الملف غير مدعوم: ${file.type}`);
        }

        // التحقق من حجم الملف
        const maxSize = isVideo
          ? UPLOAD_CONFIG.maxFileSize.video
          : UPLOAD_CONFIG.maxFileSize.image;
        if (file.size > maxSize) {
          const maxSizeMB = Math.round(maxSize / 1024 / 1024);
          throw new Error(`حجم الملف كبير جداً. الحد الأقصى: ${maxSizeMB}MB`);
        }

        console.log(`📊 معلومات الملف:`, {
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
          isVideo,
          cloudinaryAvailable: isCloudinaryAvailable,
        });

        let uploadResult;

        if (isCloudinaryAvailable) {
          // رفع إلى Cloudinary
          console.log("☁️ رفع إلى Cloudinary...");

          const cloudinaryResult = await uploadToCloudinary(file, {
            folder: "portfolio/projects",
            resource_type: isVideo ? "video" : "image",
            transformation: isVideo
              ? {
                  quality: "auto",
                  fetch_format: "auto",
                  width: 1280,
                  height: 720,
                  crop: "limit",
                  bit_rate: "1m",
                  // إضافة إعدادات للفيديو
                  flags: "streaming_attachment",
                  streaming_profile: "hd",
                }
              : {
                  quality: "auto",
                  fetch_format: "auto",
                  width: 1200,
                  height: 800,
                  crop: "limit",
                },
          });

          console.log("✅ تم رفع الملف إلى Cloudinary بنجاح");

          uploadResult = {
            success: true,
            originalName: file.name,
            fileName: cloudinaryResult.public_id,
            src: cloudinaryResult.secure_url,
            url: cloudinaryResult.secure_url,
            type: isVideo ? "VIDEO" : "IMAGE",
            size: cloudinaryResult.bytes,
            mimeType: file.type,
            width: cloudinaryResult.width || null,
            height: cloudinaryResult.height || null,
            duration: cloudinaryResult.duration || null,
            cloudinary_public_id: cloudinaryResult.public_id,
            storage_type: "cloudinary",
            // إضافة thumbnail للفيديو
            ...(isVideo && {
              thumbnail: `${cloudinaryResult.secure_url.replace("/upload/", "/upload/c_fill,h_200,w_300,so_0/")}.jpg`,
            }),
          };
        } else {
          // رفع محلي
          console.log("💾 رفع محلي...");

          const timestamp = Date.now();
          const randomString = Math.random().toString(36).substring(2, 15);
          const fileExtension = path.extname(file.name);
          const fileName = `${timestamp}_${randomString}${fileExtension}`;
          const filePath = path.join(uploadDir, fileName);

          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filePath, buffer);

          console.log("✅ تم حفظ الملف محلياً");

          uploadResult = {
            success: true,
            originalName: file.name,
            fileName: fileName,
            src: `/uploads/${fileName}`,
            url: `/uploads/${fileName}`,
            type: isVideo ? "VIDEO" : "IMAGE",
            size: file.size,
            mimeType: file.type,
            storage_type: "local",
          };
        }

        results.push(uploadResult);
      } catch (fileError) {
        console.error(`❌ خطأ في رفع الملف ${file.name}:`, fileError);

        results.push({
          success: false,
          originalName: file.name,
          error:
            fileError instanceof Error ? fileError.message : "خطأ غير معروف",
          type: "ERROR",
        });
      }
    }

    // تحليل النتائج
    const successfulFiles = results.filter((r) => r.success);
    const failedFiles = results.filter((r) => !r.success);

    console.log(
      `📊 نتائج الرفع: ${successfulFiles.length} نجح، ${failedFiles.length} فشل`,
    );

    if (successfulFiles.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "فشل في رفع جميع الملفات",
          details: failedFiles.map((f) => f.error),
          failed_files: failedFiles,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `تم رفع ${successfulFiles.length} ملف بنجاح${failedFiles.length > 0 ? `، وفشل ${failedFiles.length} ملف` : ""}`,
      files: successfulFiles,
      count: successfulFiles.length,
      storage_type: isCloudinaryAvailable ? "cloudinary" : "local",
      ...(failedFiles.length > 0 && {
        warnings: failedFiles.map((f) => `${f.originalName}: ${f.error}`),
      }),
    });
  } catch (error) {
    console.error("❌ خطأ عام في رفع الملفات:", error);

    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ في نظام رفع الملفات",
        details: error instanceof Error ? error.message : "خطأ غير معروف",
      },
      { status: 500 },
    );
  }
}

// دعم OPTIONS للـ CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
