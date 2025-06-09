import { NextRequest, NextResponse } from "next/server";

// مسارات محمية تحتاج مصادقة
const protectedPaths = ["/admin"];

// مسارات API محمية (فقط للكتابة)
const protectedApiPaths = ["/api/auth/change-password", "/api/upload"];

// مسارات API محمية للكتابة فقط (POST, PUT, DELETE)
const writeProtectedApiPaths = ["/api/projects"];

// مسارات عامة (لا تحتاج مصادقة)
const publicPaths = [
  "/",
  "/about",
  "/contact",
  "/portfolio",
  "/services",
  "/faq",
  "/privacy",
  "/terms",
  "/quote",
  "/login",
  "/simple-login",
  "/fix-login",
  "/clear-cookies",
  "/test-dashboard",
  "/admin-panel",
  "/simple-dashboard",
  "/api/health-check",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/verify",
  "/api/db-status",
  "/api/error-report",
  "/api/reviews",
  "/api/setup-admin",
  "/api/debug-cookies",
  "/api/auth/bypass",
  "/api/auth/clear-cookies",
  "/api/auth/new-login",
  "/api/auth/check-session",
  "/api/auth/new-logout",
  "/api/simple-login",
  "/api/check-login",
  "/api/debug-admin",
  "/api/debug-middleware",
  "/test-new-login",
];

// Rate limiting - تتبع الطلبات
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // دقيقة واحدة
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 طلب في الدقيقة

// دالة فحص Rate Limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // إذا انتهت النافزة الزمنية، إعادة تعيين العداد
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // زيادة العداد
  record.count++;

  // فحص الحد الأقصى
  return record.count <= RATE_LIMIT_MAX_REQUESTS;
}

// فحص الصلاحيات للمسارات المحمية - نظام بسيط جداً
async function checkAuth(request: NextRequest): Promise<boolean> {
  try {
    const { pathname } = request.nextUrl;

    // فحص الكوكيز البسيط
    const loggedIn = request.cookies.get("logged-in")?.value;
    const adminId = request.cookies.get("admin-id")?.value;

    console.log(`🔍 Simple auth check for ${pathname}:`);
    console.log(`  - logged-in: ${loggedIn}`);
    console.log(`  - admin-id exists: ${!!adminId}`);

    // فحص بسيط جداً
    const isAuthenticated = loggedIn === "yes" && !!adminId;

    console.log(
      `${isAuthenticated ? "✅" : "❌"} Auth result: ${isAuthenticated}`,
    );

    return isAuthenticated;
  } catch (error) {
    console.error("❌ خطأ في فحص المصادقة:", error);
    return false;
  }
}

// إضافة headers أمنية
function addSecurityHeaders(response: NextResponse): NextResponse {
  // HSTS
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );

  // XSS Protection
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Content Type Options
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Frame Options
  response.headers.set("X-Frame-Options", "DENY");

  // Permissions Policy
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );

  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https: blob:; " +
      "media-src 'self' https: blob:; " +
      "connect-src 'self' https: wss:; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self';",
  );

  return response;
}

// الدالة الرئيسية للـ middleware
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  // الحصول على IP العميل
  const clientIP =
    request.ip ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  console.log(`📡 ${request.method} ${pathname} من ${clientIP}`);

  // فحص Rate Limiting
  if (!checkRateLimit(clientIP)) {
    console.warn(`⚠️ Rate limit exceeded for IP: ${clientIP}`);
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": "60",
        "X-Rate-Limit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
        "X-Rate-Limit-Remaining": "0",
        "X-Rate-Limit-Reset": new Date(
          Date.now() + RATE_LIMIT_WINDOW,
        ).toISOString(),
      },
    });
  }

  // تنظيف الذاكرة من سجلات قديمة (كل 5 دقائق)
  if (Math.random() < 0.01) {
    // 1% احتمال
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now - record.timestamp > RATE_LIMIT_WINDOW * 5) {
        rateLimitMap.delete(ip);
      }
    }
  }

  // إعادة توجيه www إلى non-www
  if (request.headers.get("host")?.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = url.host.replace("www.", "");
    return NextResponse.redirect(url, 301);
  }

  // تجنب حلقة إعادة التوجيه - إذا كان المستخدم في صفحة login بالفعل
  if (pathname === "/login") {
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // وضع التجاوز المؤقت للتشخيص
  const debugMode =
    request.headers.get("x-debug-mode") === "true" ||
    pathname.includes("debug") ||
    pathname === "/dashboard"; // تجاوز مؤقت لـ dashboard

  // فحص المسارات المحمية
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isProtectedApiPath = protectedApiPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isWriteProtectedApiPath = writeProtectedApiPaths.some((path) =>
    pathname.startsWith(path),
  );

  // للمسارات المحمية للكتابة، نتحقق من نوع الطلب
  const isWriteOperation = ["POST", "PUT", "DELETE", "PATCH"].includes(
    request.method,
  );
  const needsAuth =
    isProtectedPath ||
    isProtectedApiPath ||
    (isWriteProtectedApiPath && isWriteOperation);

  if (needsAuth && !debugMode) {
    const isAuthenticated = await checkAuth(request);

    console.log(`🔐 Auth check result for ${pathname}: ${isAuthenticated}`);

    if (!isAuthenticated) {
      if (isApiRoute) {
        return NextResponse.json(
          { error: "غير مخول", code: "UNAUTHORIZED" },
          { status: 401 },
        );
      } else {
        // تجنب حلقة إعادة التوجيه
        console.log(`🔄 إعادة توجيه من ${pathname} إلى /login`);
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
      }
    } else {
      console.log(`✅ تم التحقق من الصلاحية للمسار: ${pathname}`);
    }
  } else if (debugMode) {
    console.log(`🚧 تم تجاوز المصادقة للمسار: ${pathname} (وضع التشخيص)`);
  }

  // معالجة خاصة لـ API routes
  if (isApiRoute) {
    const response = NextResponse.next();

    // إضافة CORS headers للـ API
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://aldeyarksa.tech",
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    // إضافة Rate Limiting headers
    const record = rateLimitMap.get(clientIP);
    if (record) {
      response.headers.set(
        "X-Rate-Limit-Limit",
        RATE_LIMIT_MAX_REQUESTS.toString(),
      );
      response.headers.set(
        "X-Rate-Limit-Remaining",
        (RATE_LIMIT_MAX_REQUESTS - record.count).toString(),
      );
      response.headers.set(
        "X-Rate-Limit-Reset",
        new Date(record.timestamp + RATE_LIMIT_WINDOW).toISOString(),
      );
    }

    return addSecurityHeaders(response);
  }

  // إضافة headers للصفحات العادية
  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

// تكوين المسارات التي يعمل عليها الـ middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
