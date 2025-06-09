import { NextRequest, NextResponse } from "next/server";
import { prisma, checkDatabaseConnection } from "@/lib/prisma";

// معلومات صحة النظام
interface HealthCheck {
  status: "healthy" | "unhealthy" | "degraded";
  timestamp: string;
  version: string;
  environment: string;
  database: {
    status: "connected" | "disconnected" | "error";
    latency?: number;
    error?: string;
  };
  cloudinary: {
    status: "configured" | "not_configured";
    cloudName?: string;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  uptime: number;
  checks: {
    name: string;
    status: "pass" | "fail";
    message?: string;
    duration?: number;
  }[];
}

// فحص اتصال قاعدة ا��بيانات مع قياس الوقت
async function checkDatabase(): Promise<{
  status: "connected" | "disconnected" | "error";
  latency?: number;
  error?: string;
}> {
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - startTime;

    return {
      status: "connected",
      latency,
    };
  } catch (error) {
    console.error("Database health check failed:", error);
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown database error",
    };
  }
}

// فحص إعدادات Cloudinary
function checkCloudinary(): {
  status: "configured" | "not_configured";
  cloudName?: string;
} {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    return {
      status: "configured",
      cloudName,
    };
  }

  return {
    status: "not_configured",
  };
}

// فحص استخدام الذاكرة
function getMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  const totalMemory = memoryUsage.heapTotal;
  const usedMemory = memoryUsage.heapUsed;
  const percentage = Math.round((usedMemory / totalMemory) * 100);

  return {
    used: Math.round(usedMemory / 1024 / 1024), // MB
    total: Math.round(totalMemory / 1024 / 1024), // MB
    percentage,
  };
}

// تشغيل جميع الفحوصات
async function runHealthChecks(): Promise<HealthCheck> {
  const startTime = Date.now();
  const checks: HealthCheck["checks"] = [];

  // فحص قاعدة البيانات
  const dbCheckStart = Date.now();
  const databaseStatus = await checkDatabase();
  checks.push({
    name: "database",
    status: databaseStatus.status === "connected" ? "pass" : "fail",
    message:
      databaseStatus.error || `اتصال قاعدة البيانات ${databaseStatus.status}`,
    duration: Date.now() - dbCheckStart,
  });

  // فحص Cloudinary
  const cloudinaryStatus = checkCloudinary();
  checks.push({
    name: "cloudinary",
    status: cloudinaryStatus.status === "configured" ? "pass" : "fail",
    message:
      cloudinaryStatus.status === "configured"
        ? `Cloudinary مُعد: ${cloudinaryStatus.cloudName}`
        : "Cloudinary غير مُعد",
  });

  // فحص متغيرات البيئة المهمة
  const envCheckStart = Date.now();
  const requiredEnvVars = ["JWT_SECRET", "NEXTAUTH_SECRET", "DATABASE_URL"];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  checks.push({
    name: "environment",
    status: missingEnvVars.length === 0 ? "pass" : "fail",
    message:
      missingEnvVars.length === 0
        ? "جميع متغيرات البيئة متوفرة"
        : `متغيرات البيئة المفقودة: ${missingEnvVars.join(", ")}`,
    duration: Date.now() - envCheckStart,
  });

  // حساب الحالة العامة
  const failedChecks = checks.filter((check) => check.status === "fail");
  let overallStatus: HealthCheck["status"] = "healthy";

  if (failedChecks.length > 0) {
    // إذا فشل فحص قاعدة البيانات، النظام غير صحي
    if (failedChecks.some((check) => check.name === "database")) {
      overallStatus = "unhealthy";
    } else {
      // فحوصات أخرى فاشلة، النظام متدهور
      overallStatus = "degraded";
    }
  }

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "unknown",
    database: databaseStatus,
    cloudinary: cloudinaryStatus,
    memory: getMemoryUsage(),
    uptime: Math.round(process.uptime()),
    checks,
  };
}

// GET /api/health-check
export async function GET(request: NextRequest) {
  try {
    // التحقق من الصلاحيات (اختياري)
    const authHeader = request.headers.get("authorization");
    const isAdmin =
      authHeader === `Bearer ${process.env.HEALTH_CHECK_TOKEN}` ||
      process.env.NODE_ENV === "development";

    // تشغيل فحوصات الصحة
    const healthData = await runHealthChecks();

    // إخفاء بعض التفاصيل الحساسة في الإنتاج
    if (process.env.NODE_ENV === "production" && !isAdmin) {
      delete healthData.cloudinary.cloudName;
      delete healthData.memory;
      delete healthData.checks;
    }

    // تحديد status code حسب الحالة
    let statusCode = 200;
    if (healthData.status === "unhealthy") {
      statusCode = 503; // Service Unavailable
    } else if (healthData.status === "degraded") {
      statusCode = 200; // OK but degraded
    }

    return NextResponse.json(healthData, {
      status: statusCode,
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "فشل فحص الصحة",
        environment: process.env.NODE_ENV || "unknown",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0",
          "Content-Type": "application/json",
        },
      },
    );
  }
}

// POST /api/health-check (للفحص المتقدم)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deep = false } = body;

    if (deep) {
      // فحص عميق - اختبار عمليات قاعدة البيانات الفعلية
      const dbTestStart = Date.now();

      try {
        // اختبار قراءة بسيطة
        await prisma.project.count();

        const dbTestDuration = Date.now() - dbTestStart;

        return NextResponse.json({
          status: "healthy",
          timestamp: new Date().toISOString(),
          deep_check: true,
          database: {
            status: "connected",
            test_duration: dbTestDuration,
            operations: ["read_test"],
          },
        });
      } catch (error) {
        return NextResponse.json(
          {
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            deep_check: true,
            database: {
              status: "error",
              error:
                error instanceof Error ? error.message : "Database test failed",
            },
          },
          { status: 503 },
        );
      }
    }

    // فحص عادي
    const healthData = await runHealthChecks();
    return NextResponse.json(healthData);
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Failed to process health check request",
      },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
