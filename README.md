
# 🏗️ موقع محترفين الديار العالمية - جدة

موقع احترافي لعرض أعمال ومشاريع شركة محترفين الديار العالمية المتخصصة في المظلات والسواتر وبيوت الشعر والخيام في جدة، المملكة العربية السعودية.

## 🚀 المميزات

- ✅ **تصميم متجاوب** - يعمل على جميع الأجهزة
- ✅ **محسن لمحركات البحث** - SEO متقدم
- ✅ **إدارة المشاريع** - لوحة تحكم كاملة
- ✅ **رفع الملفات** - دعم الصور والفيديوهات
- ✅ **تخزين سحابي** - Cloudinary للوسائط
- ✅ **قاعدة بيانات** - Prisma مع SQLite
- ✅ **أمان متقدم** - حماية شاملة
- ✅ **تحسين الأداء** - سرعة عالية

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM مع SQLite
- **File Storage**: Cloudinary
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Validation**: Zod
- **Code Quality**: Biome

## 📁 هيكل المشروع

```
src/
├── app/                    # صفحات التطبيق
│   ├── api/               # API Routes
│   ├── dashboard/         # لوحة التحكم
│   ├── portfolio/         # معرض الأعمال
│   ├── services/          # صفحات الخدمات
│   └── layout.tsx         # Layout الرئيسي
├── components/            # المكونات القابلة للإعادة
│   ├── ui/               # مكونات UI الأساسية
│   └── ...               # مكونات التطبيق
└── lib/                  # المكتبات والأدوات
    ├── prisma.ts         # إعداد قاعدة البيانات
    ├── cloudinary.ts     # إعداد Cloudinary
    └── utils.ts          # دوال مساعدة
```

## ⚙️ متطلبات النظام

- Node.js 18+ أو أحدث
- npm أو yarn أو pnpm أو bun

## 🏃‍♂️ تشغيل المشروع محلياً

1. **استنساخ المستودع**
```bash
git clone https://github.com/mogahedcy/aldeyaraak.git
cd aldeyaraak
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env.local
```

4. **إعداد قاعدة البيانات**
```bash
npx prisma generate
npx prisma db push
```

5. **تشغيل الخادم المحلي**
```bash
npm run dev
```

6. **فتح المتصفح**
```
http://localhost:3000
```

## 🌐 متغيرات البيئة

إنشاء ملف `.env.local` وإضافة:

```env
# قاعدة البيانات
DATABASE_URL="file:./dev.db"

# Cloudinary (للصور والفيديوهات)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# URL الموقع
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# مفتاح الأمان (لوحة التحكم)
JWT_SECRET="your-super-secret-jwt-key-here"
```

## 🚀 النشر على Vercel

### الطريقة الأولى: من GitHub (موصى بها)

1. ادخل إلى [vercel.com](https://vercel.com)
2. اربط حسابك مع GitHub
3. اختر هذا المستودع للنشر
4. أضف متغيرات البيئة في إعدادات Vercel
5. انقر على Deploy

### الطريقة الثانية: Vercel CLI

```bash
npm i -g vercel
vercel
```

### إعدادات النشر المطلوبة

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🔧 إعدادات Vercel

### متغيرات البيئة المطلوبة:
```
DATABASE_URL=your_production_database_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
JWT_SECRET=your-production-jwt-secret
```

## 📊 الأداء والتحسين

- ✅ **Image Optimization**: تحسين الصور تلقائياً
- ✅ **Code Splitting**: تقسيم الكود
- ✅ **Lazy Loading**: تحميل بطيء للمكونات
- ✅ **Static Generation**: توليد صفحات ثابتة
- ✅ **Caching**: تخزين مؤقت متقدم

## 🔐 الأمان

- ✅ **CSRF Protection**: حماية من CSRF
- ✅ **XSS Protection**: حماية من XSS
- ✅ **SQL Injection**: حماية من SQL Injection
- ✅ **Rate Limiting**: تحديد معدل الطلبات
- ✅ **Security Headers**: رؤوس أمان متقدمة

## 📝 Scripts المتاحة

```bash
npm run dev          # تشغيل البيئة التطويرية
npm run build        # بناء المشروع للإنتاج
npm run start        # تشغيل المشروع في الإنتاج
npm run lint         # فحص الأكواد
npm run format       # تنسيق الأكواد
```

## 🐛 استكشاف الأخطاء

### مشاكل شائعة وحلولها:

1. **خطأ قاعدة البيانات**
```bash
npx prisma generate
npx prisma db push
```

2. **مشكلة Cloudinary**
- تأكد من صحة مفاتيح API
- تحقق من إعدادات CORS

3. **مشكلة البناء**
```bash
rm -rf .next
npm run build
```

## 📞 الدعم

في حالة وجود مشاكل:
- افتح issue في GitHub
- تحقق من documentation
- راجع سجلات الأخطاء

## 📄 الترخيص

هذا المشروع محمي بحقوق الطبع والنشر لشركة محترفين الديار العالمية.

## 🙏 شكر وتقدير

شكر خاص لجميع المساهمين في تطوير هذا المشروع.

---

**تم التطوير بواسطة**: فريق محترفين الديار العالمية  
**الموقع**: [aldeyarksa.tech](https://aldeyarksa.tech)  
**الموقع**: جدة، المملكة العربية السعودية
