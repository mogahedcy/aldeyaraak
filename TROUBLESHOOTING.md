# دليل إصلاح الأخطاء الشائعة - مؤسسة الديار العالمية

## 🛠️ الأخطاء الشائعة وحلولها

### 1. مشاكل التطوير (Development)

#### خطأ: "Invalid next.config.js options detected"

```bash
# السبب: خيارات غير مدعومة في Next.js
# الحل: تحديث next.config.js حسب النسخة المناسبة

# فحص نسخة Next.js
npm list next

# تحديث next.config.js
# إزالة الخيارات غير المدعومة مثل:
# - experimental.outputFileTracingRoot
# - experimental.serverComponentsExternalPackages
# - images.quality (استخدم formats بدلاً منه)
```

#### خطأ: "ENOENT: no such file or directory, open '/app/package.json'"

```bash
# ا��سبب: npm يبحث في مجلد خطأ
# الحل: تصحيح مسار التشغيل

# تحديد المجلد الصحيح
cd /path/to/your/project

# أو تحديث dev command
npm run dev
# بدلاً من تشغيل npm من مجلد خطأ
```

#### خطأ: "Database connection failed"

```bash
# السبب: مشكلة في اتصال قاعدة البيانات
# الحل:

# 1. فحص متغير DATABASE_URL
echo $DATABASE_URL

# 2. فحص اتصال قاعدة البيانات
npx prisma db push

# 3. إعادة توليد Prisma Client
npx prisma generate

# 4. فحص صحة النظام
node scripts/check-health.js
```

### 2. مشاكل الإنتاج (Production)

#### خطأ: "Module not found" في الإنتاج

```bash
# السبب: dependencies مفقودة أو خطأ في التجميع
# الحل:

# 1. فحص dependencies
npm audit
npm ci --only=production

# 2. إعادة البناء
npm run build

# 3. فحص التجميع
npm run build:analyze
```

#### خطأ: "503 Service Unavailable"

```bash
# السبب: الخادم لا يستجيب
# الحل:

# 1. فحص صحة الخادم
curl https://yourdomain.com/api/health-check

# 2. فحص logs
vercel logs --app=your-app-name

# 3. إعادة تشغيل الخدمة
vercel --prod
```

#### خطأ: "Database connection timeout"

```bash
# السبب: مشكلة في pool الاتصالات
# الحل:

# 1. تحديث DATABASE_URL مع connection pooling
DATABASE_URL="postgresql://user:pass@host/db?connection_limit=10&pool_timeout=20"

# 2. تحسين Prisma config
# في src/lib/prisma.ts
```

### 3. مشاكل الأداء (Performance)

#### بطء في تحميل الصور

```bash
# السبب: صور غير محسنة
# الحل:

# 1. تفعيل تحسين الصور في next.config.js
images: {
  unoptimized: false,
  formats: ['image/webp', 'image/avif'],
}

# 2. استخدام OptimizedImage component
import { OptimizedImage } from '@/components/ui/optimized-image'

# 3. تحسين Cloudinary URLs
# إضافة تحسينات تلقائية: f_auto,q_auto
```

#### بطء في API responses

```bash
# السبب: استعلامات قاعدة بيانات غير محسنة
# الحل:

# 1. إضافة indexing في Prisma
@@index([fieldName])

# 2. تحسين الاستعلامات
# استخدام select و include بحذر

# 3. إضافة caching
# استخدام Next.js caching mechanisms
```

### 4. مشاكل الاستضافة (Deployment)

#### فشل في Build على Vercel

```bash
# السبب: أخطاء في الكود أو dependencies
# الحل:

# 1. ف��ص build محلياً
npm run build

# 2. فحص TypeScript errors
npm run type-check

# 3. فحص Environment Variables
# التأكد من وجود جميع المتغيرات المطلوبة في Vercel Dashboard
```

#### مشاكل في Domain/DNS

```bash
# السبب: إعدادات DNS خاطئة
# الحل:

# 1. فحص DNS records
nslookup yourdomain.com

# 2. تحديث CNAME في مزود الدومين
CNAME: yourdomain.com -> cname.vercel-dns.com

# 3. انتظار انتشار DNS (يمكن أن يستغرق 24 ساعة)
```

### 5. مشاكل الأمان (Security)

#### رسائل خطأ CORS

```bash
# السبب: إعدادات CORS خاطئة
# الحل:

# 1. تحديث headers في next.config.js
headers: [
  {
    source: "/api/:path*",
    headers: [
      { key: "Access-Control-Allow-Origin", value: "https://yourdomain.com" },
      { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
    ],
  },
]

# 2. تحديث middleware.ts
```

#### CSP (Content Security Policy) errors

```bash
# السبب: سياسة الأمان تمنع تحميل الموارد
# الحل:

# تحديث CSP في next.config.js أو middleware
'img-src': "'self' data: https: blob:"
'script-src': "'self' 'unsafe-inline' 'unsafe-eval'"
```

## 🔧 أدوات التشخيص

### فحص صحة النظام

```bash
# فحص شامل للنظام
curl https://yourdomain.com/api/health-check

# فحص محلي
node scripts/check-health.js

# مراقبة الأداء
node scripts/performance-monitor.js
```

### فحص قاعدة البيانات

```bash
# فحص اتصال
npx prisma db push --accept-data-loss

# عرض البيانات
npx prisma studio

# فحص الاستعلامات
npx prisma debug
```

### فحص الملفات والرفع

```bash
# اختبار Cloudinary
curl -X POST https://yourdomain.com/api/upload \
  -F "file=@test-image.jpg"

# فحص تحسين الصور
curl -I https://yourdomain.com/_next/image?url=/test.jpg&w=640&q=75
```

## 📊 مراقبة الأداء

### Metrics مهمة للمراقبة:

- **Response Time**: < 200ms للAPI routes
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Database Connection Pool**: استخدام < 80%

### أدوات المراقبة:

```bash
# Vercel Analytics
https://vercel.com/analytics

# Core Web Vitals
https://web.dev/vitals/

# Database monitoring (Neon)
https://console.neon.tech/

# Cloudinary usage
https://console.cloudinary.com/
```

## 🚨 التعامل مع الطوارئ

### خطوات سريعة للإصلاح:

1. **فحص صحة النظام**

   ```bash
   curl https://yourdomain.com/api/health-check
   ```

2. **مراجعة logs**

   ```bash
   vercel logs --app=your-app
   # أو
   tail -f logs/application.log
   ```

3. **Rollback سريع**

   ```bash
   # العودة لـ deployment سابق في Vercel
   vercel rollback --url=deployment-url
   ```

4. **إعادة تشغيل الخدمات**
   ```bash
   vercel --prod
   ```

### جهات اتصال الطوارئ:

- **مطور رئيسي**: [بريد إلكتروني]
- **مزود الاستضافة**: Vercel Support
- **قاعدة البيانات**: Neon Support
- **CDN**: Cloudinary Support

## 📞 الحصول على المساعدة

### معلومات مطلوبة عند طلب المساعدة:

1. **وصف دقيق للمشكلة**
2. **خطوات إعادة الإنتاج**
3. **رسائل الخطأ كاملة**
4. **متصفح ونظام التشغيل**
5. **timestamp الخطأ**
6. **Error ID من النظام**

### روابط مفيدة:

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

💡 **نصيحة**: احتفظ ب��ذا الدليل محدثاً وأضف أي مشاكل جديدة تواجهها مع حلولها.
