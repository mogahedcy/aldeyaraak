import { NextRequest, NextResponse } from "next/server";
import { writeFile, appendFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

interface ErrorReport {
  errorId?: string;
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url?: string;
  userAgent?: string;
  type?: string;
  props?: any;
  additionalInfo?: any;
}

// دالة لحفظ تقرير الخطأ
async function saveErrorReport(report: ErrorReport) {
  try {
    // إنشاء مجلد logs إذا لم يكن موجود
    const logsDir = path.join(process.cwd(), "logs");
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true });
    }

    // إنشاء اسم ملف مع التاريخ
    const today = new Date().toISOString().split("T")[0];
    const errorLogFile = path.join(logsDir, `errors-${today}.json`);

    // قراءة الأخطاء الموجودة أو إنشاء مصفوفة جديدة
    let errors: ErrorReport[] = [];

    if (existsSync(errorLogFile)) {
      try {
        const existingData = await import("fs").then((fs) =>
          fs.promises.readFile(errorLogFile, "utf8"),
        );
        errors = JSON.parse(existingData);
      } catch (parseError) {
        console.error("خطأ في قراءة ملف الأخطاء الموجود:", parseError);
        errors = [];
      }
    }

    // إضافة التقرير الجديد
    errors.push({
      ...report,
      id:
        report.errorId ||
        `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date().toISOString(),
    });

    // الاحتفاظ بآخر 1000 خطأ فقط لكل يوم
    if (errors.length > 1000) {
      errors = errors.slice(-1000);
    }

    // حفظ الملف
    await writeFile(errorLogFile, JSON.stringify(errors, null, 2));

    // إضافة سجل مختصر لملف log عام
    const logEntry = `[${report.timestamp}] ERROR: ${report.message} | URL: ${report.url || "N/A"} | User-Agent: ${report.userAgent || "N/A"}\n`;
    const generalLogFile = path.join(logsDir, "application.log");

    await appendFile(generalLogFile, logEntry).catch((error) => {
      console.error("خطأ في كتابة السجل العام:", error);
    });

    return { success: true, errorId: report.errorId };
  } catch (error) {
    console.error("خطأ في حفظ تقرير الخطأ:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// دالة للتحقق من معدل الأخطاء
function isErrorRateHigh(errors: ErrorReport[]): boolean {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recentErrors = errors.filter((error) => error.timestamp > oneHourAgo);

  // إذا كان هناك أكثر من 50 خطأ في الساعة الماضية، المعدل مرتفع
  return recentErrors.length > 50;
}

// دالة لإرسال تنبيه (يمكن تخصيصها)
async function sendAlert(report: ErrorReport) {
  // يمكن إضافة إرسال تنبيهات هنا مثل:
  // - إرسال بريد إلكتروني
  // - إرسال رسالة Slack
  // - إرسال إشعار Discord
  // - إرسال SMS

  console.warn("🚨 تم إرسال تنبيه خ��أ:", {
    message: report.message,
    url: report.url,
    timestamp: report.timestamp,
  });

  // مثال: يمكن إرسال webhook
  /*
  try {
    await fetch('https://hooks.slack.com/your-webhook-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 خطأ في موقع الديار: ${report.message}`,
        attachments: [{
          color: 'danger',
          fields: [
            { title: 'URL', value: report.url || 'غير محدد', short: true },
            { title: 'وقت الحدوث', value: report.timestamp, short: true },
            { title: 'Error ID', value: report.errorId || 'غير محدد', short: true }
          ]
        }]
      })
    })
  } catch (webhookError) {
    console.error('خطأ في إرسال webhook:', webhookError)
  }
  */
}

// POST /api/error-report
export async function POST(request: NextRequest) {
  try {
    // التحقق من صحة Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type يجب أن يكون application/json" },
        { status: 400 },
      );
    }

    // قراءة البيانات
    const body = await request.json();

    // التحقق من البيانات المطلوبة
    if (!body.message || !body.timestamp) {
      return NextResponse.json(
        { error: "حقول مطلوبة مفقودة: message, timestamp" },
        { status: 400 },
      );
    }

    // إعداد تقرير الخطأ
    const errorReport: ErrorReport = {
      errorId:
        body.errorId ||
        `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: body.message,
      stack: body.stack,
      componentStack: body.componentStack,
      timestamp: body.timestamp,
      url: body.url,
      userAgent: body.userAgent,
      type: body.type || "frontend_error",
      props: body.props,
      additionalInfo: body.additionalInfo,
      // إضافة معلومات الطلب
      requestInfo: {
        ip: request.ip || request.headers.get("x-forwarded-for") || "unknown",
        headers: {
          "user-agent": request.headers.get("user-agent"),
          referer: request.headers.get("referer"),
          "accept-language": request.headers.get("accept-language"),
        },
      },
    };

    // حفظ التقرير
    const saveResult = await saveErrorReport(errorReport);

    if (!saveResult.success) {
      console.error("فشل في حفظ تقرير الخطأ:", saveResult.error);
      return NextResponse.json(
        { error: "فشل في حفظ تقرير الخطأ" },
        { status: 500 },
      );
    }

    // فحص معدل الأخطاء وإرسال تنبيه إذا لزم الأمر
    if (process.env.NODE_ENV === "production") {
      // يمكن إضافة منطق للتحقق من معدل الأخطاء هنا

      // إرسال تنبيه للأخطاء الحرجة
      const criticalKeywords = [
        "database",
        "payment",
        "authentication",
        "security",
      ];
      const isCritical = criticalKeywords.some((keyword) =>
        errorReport.message.toLowerCase().includes(keyword),
      );

      if (isCritical) {
        await sendAlert(errorReport);
      }
    }

    // تسجيل الخطأ في console للمراقبة
    console.error("📋 تم تلقي تقرير خطأ:", {
      errorId: errorReport.errorId,
      message: errorReport.message,
      url: errorReport.url,
      timestamp: errorReport.timestamp,
    });

    return NextResponse.json(
      {
        success: true,
        message: "تم حفظ تقرير الخطأ بنجاح",
        errorId: errorReport.errorId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("خطأ في معالجة تقرير الخطأ:", error);

    return NextResponse.json(
      {
        success: false,
        error: "خطأ داخلي في الخادم",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// GET /api/error-report (للمراجعة - محمي)
export async function GET(request: NextRequest) {
  try {
    // التحقق من الصلاحيات (بسيط)
    const authHeader = request.headers.get("authorization");
    const isAuthorized =
      authHeader === `Bearer ${process.env.ERROR_REPORT_TOKEN}` ||
      process.env.NODE_ENV === "development";

    if (!isAuthorized) {
      return NextResponse.json({ error: "غير مخول" }, { status: 401 });
    }

    // قراءة تقارير الأخطاء
    const today = new Date().toISOString().split("T")[0];
    const errorLogFile = path.join(
      process.cwd(),
      "logs",
      `errors-${today}.json`,
    );

    if (!existsSync(errorLogFile)) {
      return NextResponse.json({
        date: today,
        errors: [],
        summary: {
          total: 0,
          critical: 0,
          recent: 0,
        },
      });
    }

    const errorsData = await import("fs").then((fs) =>
      fs.promises.readFile(errorLogFile, "utf8"),
    );
    const errors: ErrorReport[] = JSON.parse(errorsData);

    // إحصائيات
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const criticalKeywords = [
      "database",
      "payment",
      "authentication",
      "security",
    ];

    const summary = {
      total: errors.length,
      critical: errors.filter((error) =>
        criticalKeywords.some((keyword) =>
          error.message.toLowerCase().includes(keyword),
        ),
      ).length,
      recent: errors.filter((error) => error.timestamp > oneHourAgo).length,
      mostCommon: errors.reduce(
        (acc, error) => {
          acc[error.message] = (acc[error.message] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };

    return NextResponse.json({
      date: today,
      errors: errors.slice(-50), // آخر 50 خطأ
      summary,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "فشل في قراءة تقارير الأخطاء",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
