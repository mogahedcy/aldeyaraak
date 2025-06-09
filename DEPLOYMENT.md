# دليل النشر - مؤسسة الديار العالمية

## 🚀 نشر المشروع على الإنتاج

هذا دليل شامل لنشر مشروع مؤسسة الديار العالمية على منصات الاستضافة المختلفة.

---

## 📋 قائمة المراجعة قبل النشر

### ✅ متطلبات أساسية

- [ ] تم اختبار جميع الوظائف محلياً
- [ ] تم فحص متغيرات البيئة (`npm run verify-env`)
- [ ] تم إنشاء حساب مدير (`npm run create-admin`)
- [ ] تم اختبار رفع الملفات على Cloudinary
- [ ] تم اختبار قاعدة البيانات

### ✅ الأمان والحماية

- [ ] تم تغيير جميع كلمات المرور الافتراضية
- [ ] تم إنشاء مفاتيح JWT جديدة للإنتاج
- [ ] تم تفعيل SSL/HTTPS
- [ ] تم مراجعة إعدادات الأمان

---

## 🌐 نشر على Vercel (الموصى به)

### 1. إعداد المشروع على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# ربط المشروع
vercel link
```

### 2. إضافة متغيرات البيئة

في Vercel Dashboard → Settings → Environment Variables:

```bash
# قاعدة البيانات
DATABASE_URL=postgresql://neondb_owner:npg_AKqw6stDEBU7@ep-frosty-snow-a8zl0yoj-pooler.eastus2.azure.neon.tech/portfolio_db?sslmode=require

# Cloudinary
CLOUDINARY_CLOUD_NAME=dj6gk4wmy
CLOUDINARY_API_KEY=716159954779798
CLOUDINARY_API_SECRET=q_Y8NaKz2H5Q6D_9bAZZPklrJk0
CLOUDINARY_URL=cloudinary://716159954779798:q_Y8NaKz2H5Q6D_9bAZZPklrJk0@dj6gk4wmy

# الأمان (غيّر هذه القيم للإنتاج!)
JWT_SECRET=NEW_PRODUCTION_JWT_SECRET_2024_CHANGE_THIS
NEXTAUTH_SECRET=NEW_PRODUCTION_NEXTAUTH_SECRET_2024

# URLs الإنتاج
NEXTAUTH_URL=https://yourdomain.vercel.app
NEXT_PUBLIC_BASE_URL=https://yourdomain.vercel.app
NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app

# البيئة
NODE_ENV=production
```

### 3. النشر

```bash
# نشر تجريبي
vercel

# نشر إنتاج
vercel --prod
```

### 4. إعداد Domain مخصص (اختياري)

في Vercel Dashboard → Domains:

1. أضف domain الخاص بك
2. اتبع التعليمات لتوجيه DNS
3. حديث `NEXTAUTH_URL` و `NEXT_PUBLIC_BASE_URL`

---

## 🔵 نشر على Netlify

### 1. إعداد ملف netlify.toml

تم إنشاء الملف مسبقاً في المشروع:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. ربط المشروع

1. ادخل إلى Netlify Dashboard
2. اختر "New site from Git"
3. اربط repository الخاص بك
4. اختر branch `main`

### 3. إضافة متغيرات البيئة

في Netlify Dashboard → Site settings → Environment variables:

أضف نفس متغيرات البيئة المذكورة في قسم Vercel.

### 4. النشر

سيتم النشر تلقائياً عند push جديد إلى repository.

---

## 🐳 نشر باستخدام Docker

### 1. إنشاء Dockerfile

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### 2. بناء وتشغيل Container

```bash
# بناء الصورة
docker build -t aldeyar-jeddah .

# تشغيل Container
docker run -p 3000:3000 --env-file .env.local aldeyar-jeddah
```

---

## 🔧 إعداد قاعدة البيانات للإنتاج

### 1. Neon Database (المُعدّة حالياً)

قاعدة البيانات جاهزة للاستخدام. تأكد من:

```bash
# اختبار الاتصال
npx prisma db pull

# تطبيق المخطط
npx prisma db push

# إنشاء المدير الأول
npm run create-admin
```

### 2. نصائح الأمان لقاعدة البيانات

- ✅ استخدم connection pooling
- ✅ فعّل SSL mode
- ✅ قم بنسخ احتياطية منتظمة
- ✅ راقب استخدام الموارد

---

## 📊 مراقبة الأداء

### 1. Vercel Analytics

فعّل Analytics في Vercel Dashboard للحصول على:

- إحصائيات الزوار
- أداء الصفحات
- Core Web Vitals

### 2. Cloudinary Analytics

راقب استخدام Cloudinary:

- حجم التخزين المستخدم
- عدد التحويلات
- معدل نقل البيانات

### 3. Database Monitoring

راقب Neon Database:

- أداء الاستعلامات
- استخدام الاتصالات
- حجم قاعدة البيانات

---

## 🔒 إعدادات الأمان للإنتاج

### 1. تحديث كلمات المرور

```bash
# إنشاء JWT secret جديد
openssl rand -base64 64

# إنشاء NextAuth secret جديد
openssl rand -base64 32
```

### 2. إعدادات DNS

أضف السجلات التالية لـ domain الخاص بك:

```dns
A     @          76.76.19.61
CNAME www        yourdomain.vercel.app
CNAME api        yourdomain.vercel.app
```

### 3. SSL/TLS

- ✅ Vercel يوفر SSL تلقائياً
- ✅ فعّل HSTS
- ✅ استخدم HTTPS Redirects

---

## 🧪 اختبار الإنتاج

### 1. اختبارات وظيفية

```bash
# اختبار الصفحات الأساسية
curl -I https://yourdomain.com
curl -I https://yourdomain.com/portfolio
curl -I https://yourdomain.com/about

# اختبار API
curl -X POST https://yourdomain.com/api/projects \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### 2. اختبار الأداء

استخدم أدوات:

- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse

### 3. اختبار الأمان

- SSL Labs Test
- SecurityHeaders.com
- OWASP ZAP

---

## 🔄 إعداد CI/CD

### 1. GitHub Actions

إنشاء `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: "--prod"
```

---

## 📝 نصائح مهمة للإنتاج

### ⚠️ أمان

- غيّر جميع كلمات المرور الافتراضية
- استخدم مفاتيح JWT قوية
- فعّل جميع headers الأمان
- راقب محاولات الدخول المشبوهة

### 🚀 أداء

- فعّل ضغط الصور في Cloudinary
- استخدم CDN للملفات الثابتة
- راقب أوقات الاستجابة
- قم بتحسين استعلامات قاعدة البيانات

### 📊 مراقبة

- فعّل error logging
- راقب استخدام الموارد
- اعدّ تنبيهات للأخطاء
- قم بنسخ احتياطية منتظمة

---

## 🆘 استكشاف أخطاء الإنتاج

### مشاكل شائعة:

#### 1. خطأ 500 - Internal Server Error

```bash
# فحص logs في Vercel
vercel logs

# فحص متغيرات البيئة
vercel env ls
```

#### 2. خطأ في قاعدة البيانات

```bash
# اختبار الاتصال
npx prisma db pull

# إعادة تطبيق المخطط
npx prisma db push --force-reset
```

#### 3. خطأ في Cloudinary

```bash
# اختبار API
curl -X GET \
  "https://api.cloudinary.com/v1_1/dj6gk4wmy/usage" \
  -u "API_KEY:API_SECRET"
```

---

## 📞 الدعم

في حالة مواجهة مشاكل:

1. **راجع logs الإنتاج**
2. **اختبر محلياً أولاً**
3. **تأكد من متغيرات البيئة**
4. **راجع documentation المنصة**

---

**نشر موفق! 🚀**
