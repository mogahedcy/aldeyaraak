# مؤسسة الديار العالمية - الموقع الرسمي

[![النسخة](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/aldeyar-global/aldeyar-website)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)

الموقع الرسمي لمؤسسة الديار العالمية - الرائدة في خدمات المظلات والبرجولات والسواتر في جدة، المملكة العربية السعودية.

## 🚀 المزايا

- ⚡ **أداء عالي**: مُحسّن للسرعة والاستجابة
- 🎨 **تصميم متجاوب**: يعمل على جميع الأجهزة
- 🔒 **أمان متقدم**: Headers أمنية ومصادقة قوية
- 📊 **لوحة تحكم**: إدارة المشاريع والمحتوى
- 🖼️ **معرض أعمال**: عرض المشاريع بجودة عالية
- 🌐 **SEO محسن**: لتحسين الظهور في محركات البحث
- 📱 **PWA جاهزة**: يمكن تثبيتها كتطبيق

## 🛠️ التقنيات المستخدمة

### Frontend

- **Next.js 15** - React Framework مع App Router
- **TypeScript** - للكتابة الآمنة
- **Tailwind CSS** - للتصميم المتجاوب
- **Framer Motion** - للانيميشن
- **Radix UI** - مكونات UI متاحة

### Backend

- **Next.js API Routes** - Backend API
- **Prisma** - ORM لقاعدة البيانات
- **PostgreSQL** - قاعدة البيانات (Neon)
- **JWT** - للمصادقة والجلسات

### خدمات خارجية

- **Cloudinary** - إدارة الصور والفيديوهات
- **Vercel** - الاستضافة والانتشار
- **Neon** - قاعدة بيانات PostgreSQL

## 📦 التثبيت والتشغيل

### المتطلبات

- Node.js 18.17+
- npm 9.0+
- Git

### 1. استنساخ المشروع

```bash
git clone https://github.com/aldeyar-global/aldeyar-website.git
cd aldeyar-website
```

### 2. تثبيت التبعيات

```bash
npm install
```

### 3. إعداد متغيرات البيئة

```bash
# نسخ ملف البيئة التجريبي
cp .env.example .env.local

# تحرير الملف وإضافة القيم الفعلية
nano .env.local
```

**متغيرات البيئة المطلوبة:**

```env
# Database
DATABASE_URL="postgresql://..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Authentication
JWT_SECRET="your_jwt_secret"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NODE_ENV="development"
```

### 4. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npm run db:generate

# تشغيل migrations
npm run db:push

# (اختياري) إضافة بيانات تجريبية
npm run db:seed
```

### 5. تشغيل المشروع

```bash
# للتطوير
npm run dev

# للإنتاج
npm run build
npm start
```

الموقع سيكون متاحاً على: `http://localhost:3000`

## 🚀 الاستضافة على Vercel

### 1. إعداد المشروع على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# ربط المشروع
vercel link
```

### 2. إعداد متغ��رات البيئة

في لوحة تحكم Vercel، أضف المتغيرات التالية:

```env
DATABASE_URL=postgresql://your_neon_db_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_production_jwt_secret
NEXTAUTH_SECRET=your_production_nextauth_secret
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
```

### 3. النشر

```bash
# نشر للإنتاج
vercel --prod

# أو دفع للـ repository (إذا كان مربوط بـ auto-deploy)
git push origin main
```

## 🐳 الاستضافة باستخدام Docker

### 1. إنشاء ملف Docker

```dockerfile
# Dockerfile موجود بالفعل في المشروع
```

### 2. بناء وتشغيل الحاوية

```bash
# بناء الصورة
docker build -t aldeyar-website .

# تشغيل الحاوية
docker run -p 3000:3000 \
  -e DATABASE_URL="your_db_url" \
  -e CLOUDINARY_CLOUD_NAME="your_cloud_name" \
  aldeyar-website
```

## 📁 هيكل المشروع

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # مسارات الموقع
│   ├── api/               # API Routes
│   ├── dashboard/         # لوحة التحكم
│   └── globals.css        # الستايل العام
├── components/            # مكونات React
│   ├── ui/               # مكونات UI أساسية
│   └── ...               # مكونات مخصصة
├── lib/                  # مكتبات مساعدة
│   ├── prisma.ts         # إعداد قاعدة البيانات
│   ├── cloudinary.ts     # إعداد Cloudinary
│   └── utils.ts          # دوال مساعدة
└── middleware.ts         # Next.js Middleware
```

## 🔧 الأوامر المتاحة

```bash
# التطوير
npm run dev              # تشغيل server التطوير
npm run build           # بناء المشروع للإنتاج
npm run start           # تشغيل النسخة المبنية
npm run lint            # فحص الكود
npm run type-check      # فحص TypeScript

# قاعدة البيانات
npm run db:generate     # توليد Prisma Client
npm run db:push         # دفع التغييرات لقاعدة البيانات
npm run db:studio       # فتح Prisma Studio
npm run db:migrate      # تشغيل migrations

# أخرى
npm run health          # فحص صحة النظام
npm run clean           # تنظيف الملفات المؤقتة
npm run build:analyze   # تحليل bundle size
```

## 🐛 استكشاف الأخطاء

### مشاكل شائعة:

**1. خطأ اتصال قاعدة البيانات:**

```bash
# فحص متغيرات البيئة
echo $DATABASE_URL

# فحص اتصال قاعدة البيانات
npm run health
```

**2. مشاكل في الصور:**

```bash
# التأكد من إعدادات Cloudinary
echo $CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY
```

**3. مشاكل في البناء:**

```bash
# تنظيف cache
npm run clean
npm install
npm run build
```

### فحص صحة النظام:

```bash
# محلياً
curl http://localhost:3000/api/health-check

# على الإنتاج
curl https://yourdomain.com/api/health-check
```

## 📊 المراقبة والأداء

### Metrics متاحة:

- **Core Web Vitals**: LCP, FID, CLS
- **Server Response Time**: < 200ms
- **Build Size**: محسن لأقل من 250KB
- **Image Optimization**: WebP/AVIF تلقائي

### تحسين الأداء:

- ✅ Image optimization مع Next.js
- ✅ Code splitting ت��قائي
- ✅ Static generation للصفحات
- ✅ CDN caching مع Vercel
- ✅ Database connection pooling

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📝 الترخيص

هذا المشروع محفوظ لمؤسسة الديار العالمية. جميع الحقوق محفوظة.

## 📞 التواصل

- **الموقع**: [https://aldeyarksa.tech](https://aldeyarksa.tech)
- **هاتف**: +966 55 371 9009
- **بريد**: info@aldeyar-jeddah.com
- **العنوان**: جدة، المملكة العربية السعودية

---

<div dir="rtl">
<p align="center">
  صُنع بـ ❤️ لمؤسسة الديار العالمية
</p>
</div>
