import { v2 as cloudinary } from 'cloudinary';

// تكوين Cloudinary
const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'demo'
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary configured successfully with cloud:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
  console.log('⚠️ Cloudinary not configured. Using fallback mode.');
  console.log('Environment variables:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? '***set***' : 'missing',
    api_secret: process.env.CLOUDINARY_API_SECRET ? '***set***' : 'missing'
  });
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  resource_type: 'image' | 'video' | 'raw';
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
  created_at: string;
}

/**
 * رفع ملف إلى Cloudinary
 */
export async function uploadToCloudinary(
  file: File,
  options: {
    folder?: string;
    public_id?: string;
    resource_type?: 'auto' | 'image' | 'video' | 'raw';
    transformation?: any;
  } = {}
): Promise<CloudinaryUploadResult> {
  // التحقق من إعداد Cloudinary
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary غير مُعَدّ. يرجى إضافة بيانات الاعتماد في ملف .env');
  }

  try {
    // تحويل File إلى Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // تحديد نوع الملف
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    const defaultOptions = {
      folder: options.folder || 'portfolio',
      resource_type: options.resource_type || (isVideo ? 'video' : isImage ? 'image' : 'auto'),
      public_id: options.public_id,
      transformation: options.transformation || (isVideo ? {
        // تحسينات للفيديو
        quality: 'auto',
        fetch_format: 'auto',
        width: 1280,
        height: 720,
        crop: 'limit', // لا يقطع، فقط يقلل إذا كان أكبر
        bit_rate: '1m', // 1 Mbps للحجم المعقول
      } : {
        // تحسينات للصور
        quality: 'auto',
        fetch_format: 'auto',
        flags: 'progressive',
      }),
      // إعدادات إضافية
      overwrite: true,
      invalidate: true,
      // إعدادات خاصة بالفيديو
      ...(isVideo && {
        chunk_size: 6000000, // 6MB chunks for large videos
        timeout: 120000, // 2 minutes timeout for videos
      }),
      ...options
    };

    console.log('🚀 رفع ملف إلى Cloudinary:', {
      name: file.name,
      type: file.type,
      size: file.size,
      folder: defaultOptions.folder,
      resource_type: defaultOptions.resource_type,
      sizeInMB: (file.size / 1024 / 1024).toFixed(2) + 'MB'
    });

    // رفع الملف
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        defaultOptions,
        (error, result) => {
          if (error) {
            console.error('❌ خطأ في رفع Cloudinary:', error);
            reject(error);
          } else if (result) {
            console.log('✅ تم رفع الملف بنجاح:', {
              url: result.secure_url,
              public_id: result.public_id,
              resource_type: result.resource_type,
              bytes: result.bytes
            });
            
            // التحقق من صحة النتيجة
            if (!result.secure_url) {
              reject(new Error('لم يتم إرجاع رابط آمن من Cloudinary'));
              return;
            }
            
            resolve(result as CloudinaryUploadResult);
          } else {
            reject(new Error('لم يتم إرجاع نتيجة من Cloudinary'));
          }
        }
      ).end(buffer);
    });

    return result;
  } catch (error) {
    console.error('❌ خطأ في رفع الملف:', error);

    // رسائل خطأ مخصصة حسب نوع الخطأ
    let errorMessage = 'خطأ غير معروف';

    if (error instanceof Error) {
      if (error.message.includes('Invalid cloud_name')) {
        errorMessage = 'اسم Cloud غير صحيح في إعدادات Cloudinary';
      } else if (error.message.includes('Invalid API key')) {
        errorMessage = 'API Key غير صحيح في إعدادات Cloudinary';
      } else if (error.message.includes('file size')) {
        errorMessage = 'حجم الملف كبير جداً. الحد الأقصى للفيديو 100MB';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'انتهت مهلة رفع الملف. جرب ملف أصغر';
      } else if (isVideo && error.message.includes('resource_type')) {
        errorMessage = 'نوع الفيديو غير مدعوم. جرب MP4';
      } else {
        errorMessage = error.message;
      }
    }

    throw new Error(`فشل في رفع الملف: ${errorMessage}`);
  }
}

/**
 * حذف ملف من Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<any> {
  try {
    console.log('🗑️ حذف ملف من Cloudinary:', publicId);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true
    });

    console.log('✅ تم حذف الملف:', result);
    return result;
  } catch (error) {
    console.error('❌ خطأ في حذف الملف:', error);
    throw error;
  }
}

/**
 * الحصول على رابط محسن للصورة
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    quality: options.quality || 'auto',
    fetch_format: options.format || 'auto',
    width: options.width,
    height: options.height,
    crop: options.crop || 'fill',
    flags: 'progressive',
    ...options
  });
}

/**
 * الحصول على رابط محسن للفيديو
 */
export function getOptimizedVideoUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    quality: options.quality || 'auto',
    fetch_format: options.format || 'auto',
    width: options.width,
    height: options.height,
    ...options
  });
}

/**
 * إنشاء thumbnail للفيديو
 */
export function getVideoThumbnail(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    start_offset?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    quality: 'auto',
    width: options.width || 300,
    height: options.height || 200,
    crop: 'fill',
    start_offset: options.start_offset || '0',
    ...options
  });
}

export default cloudinary;
