# مؤسسة الديار العالمية - Dockerfile
# Multi-stage build للحصول على أصغر حجم ممكن

# مرحلة 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# تثبيت dependencies فقط
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# مرحلة 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# نسخ dependencies من المرحلة السابقة
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# إعداد متغيرات البيئة للبناء
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# توليد Prisma Client
RUN npx prisma generate

# بناء التطبيق
RUN npm run build

# مرحل�� 3: Runner (الحاوية النهائية)
FROM node:18-alpine AS runner
WORKDIR /app

# إعداد مستخدم غير root للأمان
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# تثبيت حزم النظام المطلوبة
RUN apk add --no-cache curl

# إعداد متغيرات البيئة
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# نسخ الملفات المطلوبة للتشغيل
COPY --from=builder /app/public ./public

# نسخ build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# نسخ Prisma schema وclient
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# إنشاء مجلد للملفات المرفوعة (إذا لزم الأمر)
RUN mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads

# التغيير للمستخدم غير المميز
USER nextjs

# فتح المنفذ
EXPOSE 3000

# Health check للتأكد من صحة الحاوية
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health-check || exit 1

# تشغيل التطبيق
CMD ["node", "server.js"]

# إضافة metadata
LABEL maintainer="مؤسسة الديار العالمية <info@aldeyar-jeddah.com>"
LABEL description="الموقع الرسمي لمؤسسة الديار العالمية"
LABEL version="2.0.0"
