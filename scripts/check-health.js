#!/usr/bin/env node

/**
 * مؤسسة الديار العالمية - Health Check Script
 * سكريبت سريع للتحقق من صحة التطبيق
 */

const http = require("http");

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// دالة لإجراء HTTP request
function makeRequest(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const req = http.get(url, (res) => {
      const responseTime = Date.now() - startTime;
      let data = "";

      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({
            statusCode: res.statusCode,
            responseTime,
            data: jsonData,
            headers: res.headers,
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            responseTime,
            data: data,
            headers: res.headers,
            parseError: error.message,
          });
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(timeout, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
  });
}

// فحص الصفحات المهمة
async function checkPages() {
  const pages = [
    { path: "/", name: "الصفحة الرئيسية" },
    { path: "/api/health-check", name: "Health Check API" },
    { path: "/about", name: "صفحة عن الشركة" },
    { path: "/contact", name: "صفحة التواصل" },
    { path: "/portfolio", name: "معرض الأعمال" },
  ];

  console.log("🔍 فحص صحة التطبيق...\n");
  console.log(`🌐 الموقع: ${baseUrl}\n`);

  let successCount = 0;
  let totalChecks = pages.length;

  for (const page of pages) {
    try {
      const url = `${baseUrl}${page.path}`;
      console.log(`📡 فحص ${page.name}...`);

      const result = await makeRequest(url);
      const { statusCode, responseTime } = result;

      if (statusCode >= 200 && statusCode < 400) {
        console.log(`✅ ${page.name}: ${statusCode} (${responseTime}ms)`);
        successCount++;

        // معلومات إضافية للـ health check
        if (page.path === "/api/health-check" && result.data) {
          console.log(`   📊 حالة النظام: ${result.data.status || "غير محدد"}`);
          if (result.data.database) {
            console.log(`   🗄️ قاعدة البيانات: ${result.data.database.status}`);
          }
          if (result.data.cloudinary) {
            console.log(`   ☁️ Cloudinary: ${result.data.cloudinary.status}`);
          }
        }
      } else {
        console.log(`❌ ${page.name}: ${statusCode} (${responseTime}ms)`);
      }
    } catch (error) {
      console.log(`💥 ${page.name}: خطأ - ${error.message}`);
    }

    // انتظار قصير بين الطلبات
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("\n📈 النتائج:");
  console.log(`✅ نجح: ${successCount}/${totalChecks}`);
  console.log(
    `📊 معدل النجاح: ${((successCount / totalChecks) * 100).toFixed(1)}%`,
  );

  if (successCount === totalChecks) {
    console.log("\n🎉 جميع الفحوصات نجحت! التطبيق يعمل بشكل صحيح.");
    process.exit(0);
  } else {
    console.log("\n⚠️ بعض الفحوصات فشلت. يرجى مراجعة الأخطاء أعلاه.");
    process.exit(1);
  }
}

// تشغيل الفحص
checkPages().catch((error) => {
  console.error("💥 خطأ في تشغيل فحص الصحة:", error);
  process.exit(1);
});
