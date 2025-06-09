# البيئة والإعدادات - مؤسسة الديار العالمية

## 🛠️ إعداد متغيرات البيئة

تم إعداد جميع متغيرات البيئة المطلوبة للمشروع. يحتوي هذا المشروع على الخدمات التالية:

### 📋 الخدمات المُعدّة

1. **قاعدة البيانات**: PostgreSQL على Neon Database
2. **تخزين الملفات**: Cloudinary لإدارة الصور والفيديوهات
3. **المصادقة**: JWT مع تشفير آمن
4. **الأمان**: حماية متقدمة ضد الهجمات

---

## 🔧 ملفات البيئة

### `.env.local` (ملف الإعدادات الحالي)

```bash
# قاعدة البيانات
DATABASE_URL="postgresql://neondb_owner:npg_AKqw6stDEBU7@ep-frosty-snow-a8zl0yoj-pooler.eastus2.azure.neon.tech/portfolio_db?sslmode=require"

# Cloudinary
CLOUDINARY_CLOUD_NAME="dj6gk4wmy"
CLOUDINARY_API_KEY="716159954779798"
CLOUDINARY_API_SECRET="q_Y8NaKz2H5Q6D_9bAZZPklrJk0"

# الأمان
JWT_SECRET="aldeyar_global_jeddah_secret_2024_!@#$%^&*"

# Next.js
NEXTAUTH_SECRET="nextauth_secret_for_aldeyar_2024"
NEXTAUTH_URL="http://localhost:3000"
```

### `.env.example` (مرجع للإعدادات)

يحتوي على جميع المتغيرات المطلوبة مع شرح لكل منها.

---

## 🚀 التشغيل السريع

### 1. تثبيت المتطلبات

```bash
# تثبيت الحزم
npm install
# أو
bun install

# إعداد قاعدة البيانات
npx prisma generate
npx prisma db push
```

### 2. إنشاء مدير أول

```bash
# تشغيل سكريبت إنشاء المدير
node scripts/create-admin.js
```

### 3. تشغيل المشروع

```bash
# التشغيل في وضع التطوير
npm run dev
# أو
bun dev

# الموقع سيكون متاح على: http://localhost:3000
```

---

## 📊 قاعدة البيانات

### معلومات الاتصال:

- **المزود**: Neon Database (PostgreSQL)
- **المنطقة**: East US 2 (Azure)
- **SSL**: مطلوب
- **المخطط**: تم إعداده باستخدام Prisma

### الجداول الأساسية:

- `projects`: مشاريع المعرض
- `media_items`: صور وفيديوهات المشاريع
- `admins`: حسابات المديرين
- `comments`: تعليقات العملاء

---

## 🏗️ تخزين الملفات (Cloudinary)

### الإعدادات:

- **Cloud Name**: `dj6gk4wmy`
- **التحسين**: تلقائي للصور والفيديوهات
- **المجلدات**: `portfolio` للمشاريع
- **الحد الأقصى**: 50MB للملف الواحد

### الميزات المدعومة:

- ✅ رفع الصور (JPG, PNG, WebP)
- ✅ رفع الفيديوهات (MP4, MOV, AVI)
- ✅ تحسين تلقائي للجودة
- ✅ إنشاء صور مصغرة للفيديو
- ✅ ضغط ذكي لتوفير المساحة

---

## 🔐 الأمان والمصادقة

### JWT Configuration:

- **الخوارزمية**: HS256
- **مدة الانتهاء**: 24 ساعة
- **المُصدر**: aldeyar-jeddah
- **الجمهور**: aldeyar-admin

### الحماية المُفعّلة:

- ✅ تشفير كلمات المرور (bcrypt)
- ✅ حماية ضد CSRF
- ✅ حماية ضد XSS
- ✅ تحديد معدل الطلبات
- ✅ تنظيف البيانات المدخلة
- ✅ سجل التدقيق

---

## 🌐 إعدادات الإنتاج

### للنشر على Vercel:

```bash
# إضافة متغيرات البيئة في Vercel Dashboard:
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=dj6gk4wmy
CLOUDINARY_API_KEY=716159954779798
CLOUDINARY_API_SECRET=q_Y8NaKz2H5Q6D_9bAZZPklrJk0
JWT_SECRET=aldeyar_global_jeddah_secret_2024_!@#$%^&*
NEXTAUTH_SECRET=nextauth_secret_for_aldeyar_2024
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
```

### للنشر على Netlify:

```bash
# إضافة متغيرات البيئة في Netlify Dashboard
# نفس المتغيرات المذكورة أعلاه
```

---

## 🧪 الاختبار والتطوير

### صفحات الاختبار المتوفرة:

- `/test-cloudinary` - اختبار رفع الملفات
- `/test-video` - اختبار رفع الفيديو
- `/login/test` - ��ختبار تسجيل الدخول

### أوامر مفيدة:

```bash
# إعادة تعيين قاعدة البيانات
npx prisma db push --force-reset

# عرض البيانات
npx prisma studio

# فحص الأمان
npm run lint

# بناء الإنتاج
npm run build
```

---

## 🔧 استكشاف الأخطاء

### مشاكل شائعة:

#### 1. خطأ في الاتصال بقاعدة البيانات

```bash
# التحقق من DATABASE_URL
echo $DATABASE_URL

# اختبار الاتصال
npx prisma db pull
```

#### 2. خطأ في Cloudinary

```bash
# التحقق من الإعدادات
curl -X GET \
  "https://api.cloudinary.com/v1_1/dj6gk4wmy/usage" \
  -u "716159954779798:q_Y8NaKz2H5Q6D_9bAZZPklrJk0"
```

#### 3. خطأ في JWT

```bash
# التحقق من طول المفتاح
echo $JWT_SECRET | wc -c
# يجب أن يكون أكبر من 32 حرف
```

---

## 📞 الدعم والمساعدة

في حالة مواجهة مشاكل:

1. **تحقق من ملفات السجل**: `npm run dev` سيعرض الأخطاء
2. **اختبر الاتصالات**: استخدم صفحات الاختبار المذكورة
3. **راجع التكوين**: تأكد من صحة جميع متغيرات البيئة

---

## 📝 الملاحظات المهمة

- ⚠️ لا تشارك ملف `.env.local` أبداً
- ⚠️ غيّر كلمات المرور في الإنتاج
- ⚠️ استخدم HTTPS في الإنتاج
- ⚠️ فعّل النسخ الاحتياطي لقاعدة البيانات
- ⚠️ راقب استخدام Cloudinary

---

## 🎯 الخطوات التالية

1. ✅ تم إعداد جميع متغيرات البيئة
2. ✅ تم تكوين قاعدة البيانات
3. ✅ تم تكوين Cloudinary
4. ✅ تم تكوين الأمان

### للبدء:

1. شغّل `npm run dev`
2. اذهب إلى `http://localhost:3000`
3. قم بإنشاء حساب مدير جديد
4. ابدأ في إضافة المشاريع!

---

**تم إعداد المشروع بنجاح! 🚀**
