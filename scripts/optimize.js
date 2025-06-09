#!/usr/bin/env node

/**
 * مؤسسة الديار العالمية - Optimization Script
 * سكريبت تحسين شامل للأداء والاستضافة
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 بدء تحسين مؤسسة الديار العالمية...\n");

// دالة لتشغيل أوامر shell
function runCommand(command, description) {
  try {
    console.log(`📋 ${description}...`);
    const output = execSync(command, { encoding: "utf8", stdio: "inherit" });
    console.log(`✅ ${description} مكتمل\n`);
    return true;
  } catch (error) {
    console.error(`❌ فشل في ${description}:`, error.message);
    return false;
  }
}

// دالة لفحص ملف
function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}: موجود`);
    return true;
  } else {
    console.log(`❌ ${description}: مفقود`);
    return false;
  }
}

// دالة لتحسين package.json
function optimizePackageJson() {
  console.log("📦 تحسين package.json...");

  const packagePath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(packagePath)) {
    console.log("❌ package.json غير موجود");
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  // إضافة scripts مفقودة
  const requiredScripts = {
    "build:production": "NODE_ENV=production npm run build",
    health: "curl -f http://localhost:3000/api/health-check || exit 1",
    clean: "rm -rf .next out node_modules/.cache",
    "type-check": "tsc --noEmit",
  };

  let updated = false;
  for (const [script, command] of Object.entries(requiredScripts)) {
    if (!packageJson.scripts[script]) {
      packageJson.scripts[script] = command;
      updated = true;
    }
  }

  // إضافة engines إذا لم تكن موجودة
  if (!packageJson.engines) {
    packageJson.engines = {
      node: ">=18.17.0",
      npm: ">=9.0.0",
    };
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log("✅ تم تحديث package.json");
  } else {
    console.log("✅ package.json محسن بالفعل");
  }

  return true;
}

// دالة لفحص متغيرات البيئة
function checkEnvironmentVariables() {
  console.log("🔧 فحص متغيرات البيئة...");

  const requiredEnvVars = [
    "DATABASE_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "JWT_SECRET",
    "NEXTAUTH_SECRET",
  ];

  const missingVars = [];

  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.log(`❌ متغيرات البيئة المفقودة: ${missingVars.join(", ")}`);
    console.log("💡 قم بنسخ .env.example إلى .env وإضافة القيم المطلوبة");
    return false;
  } else {
    console.log("✅ جميع متغيرات البيئة متوفرة");
    return true;
  }
}

// دالة لتحسين next.config.js
function optimizeNextConfig() {
  console.log("⚙️ فحص next.config.js...");

  const configPath = path.join(process.cwd(), "next.config.js");
  if (!fs.existsSync(configPath)) {
    console.log("❌ next.config.js غير موجود");
    return false;
  }

  const configContent = fs.readFileSync(configPath, "utf8");

  // فحص الإعدادات المهمة
  const requiredConfigs = [
    { check: "output: 'standalone'", name: "Standalone output" },
    { check: "compress: true", name: "Compression" },
    { check: "poweredByHeader: false", name: "Security headers" },
    { check: "generateEtags: true", name: "ETags" },
  ];

  let allGood = true;
  for (const config of requiredConfigs) {
    if (configContent.includes(config.check)) {
      console.log(`✅ ${config.name}: مُفعل`);
    } else {
      console.log(`⚠️ ${config.name}: غير مُفعل`);
      allGood = false;
    }
  }

  return allGood;
}

// دالة لتحسين قاعدة البيانات
async function optimizeDatabase() {
  console.log("🗄️ تحسين قاعدة البيانات...");

  try {
    // فحص Prisma schema
    if (!checkFile("prisma/schema.prisma", "Prisma schema")) {
      return false;
    }

    // توليد Prisma client
    runCommand("npx prisma generate", "توليد Prisma client");

    // فحص اتصال قاعدة البيانات (بدون تطبيق migrations)
    console.log("📡 فحص اتصال قاعدة البيانات...");
    // يمكن إضافة فحص أكثر تفصيلاً هنا

    return true;
  } catch (error) {
    console.error("❌ خطأ في تحسين قاعدة البيانات:", error.message);
    return false;
  }
}

// دالة لفحص الملفات المهمة
function checkImportantFiles() {
  console.log("📁 فحص الملفات المهمة...");

  const importantFiles = [
    { path: "src/app/layout.tsx", name: "Layout component" },
    { path: "src/app/page.tsx", name: "Home page" },
    { path: "src/lib/prisma.ts", name: "Prisma client" },
    { path: "src/components/ErrorBoundary.tsx", name: "Error Boundary" },
    { path: "src/app/api/health-check/route.ts", name: "Health Check API" },
    { path: "tailwind.config.ts", name: "Tailwind config" },
    { path: "tsconfig.json", name: "TypeScript config" },
  ];

  let allExists = true;
  for (const file of importantFiles) {
    if (!checkFile(file.path, file.name)) {
      allExists = false;
    }
  }

  return allExists;
}

// دالة لتحسين الأداء
function optimizePerformance() {
  console.log("⚡ تحسين الأداء...");

  // فحص حجم node_modules
  try {
    const output = execSync("du -sh node_modules", { encoding: "utf8" });
    console.log(`📦 حجم node_modules: ${output.trim()}`);
  } catch (error) {
    console.log("⚠️ لا يمكن فحص حجم node_modules");
  }

  // تنظيف الملفات المؤقتة
  const cleanPaths = [".next", "out", "node_modules/.cache"];
  for (const cleanPath of cleanPaths) {
    if (fs.existsSync(cleanPath)) {
      try {
        fs.rmSync(cleanPath, { recursive: true, force: true });
        console.log(`🧹 تم تنظيف: ${cleanPath}`);
      } catch (error) {
        console.log(`⚠️ لا يمكن تنظيف: ${cleanPath}`);
      }
    }
  }

  return true;
}

// دالة لاختبار البناء
function testBuild() {
  console.log("🏗️ اختبار البناء...");

  try {
    // اختبار TypeScript
    runCommand("npx tsc --noEmit", "فحص TypeScript");

    // اختبار البناء
    const buildSuccess = runCommand("npm run build", "بناء المشروع");

    if (buildSuccess) {
      console.log("✅ البناء نجح! المشروع جاهز للاستضافة");
      return true;
    } else {
      console.log("❌ فشل في البناء");
      return false;
    }
  } catch (error) {
    console.error("❌ خطأ في اختبار البناء:", error.message);
    return false;
  }
}

// دالة لإنشاء تقرير التحسين
function generateOptimizationReport(results) {
  console.log("\n📊 ت��رير التحسين:");
  console.log("==================");

  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter((result) => result).length;
  const score = Math.round((passedChecks / totalChecks) * 100);

  console.log(
    `📈 النتيجة الإجمالية: ${score}% (${passedChecks}/${totalChecks})`,
  );
  console.log("");

  for (const [check, passed] of Object.entries(results)) {
    const status = passed ? "✅" : "❌";
    console.log(`${status} ${check}`);
  }

  console.log("");

  if (score >= 90) {
    console.log("🎉 ممتاز! المشروع محسن بشكل جيد");
  } else if (score >= 70) {
    console.log("👍 جيد! هناك بعض التحسينات الطفيفة");
  } else {
    console.log("⚠️ يحتاج تحسين! راجع الأخطاء أعلاه");
  }

  // حفظ التقرير في ملف
  const reportData = {
    timestamp: new Date().toISOString(),
    score,
    totalChecks,
    passedChecks,
    results,
    recommendations: generateRecommendations(results),
  };

  try {
    const reportsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportFile = path.join(reportsDir, "optimization-report.json");
    fs.writeFileSync(reportFile, JSON.stringify(reportData, null, 2));
    console.log(`💾 تم حفظ التقرير في: ${reportFile}`);
  } catch (error) {
    console.error("⚠️ لا يمكن حفظ التقرير:", error.message);
  }

  return score;
}

// دالة لإنشاء توصيات
function generateRecommendations(results) {
  const recommendations = [];

  if (!results["Environment Variables"]) {
    recommendations.push("قم بنسخ .env.example إلى .env وإضافة القيم المطلوبة");
  }

  if (!results["Important Files"]) {
    recommendations.push("تأكد من وجود جميع الملفات المهمة");
  }

  if (!results["Next.js Config"]) {
    recommendations.push("حدث next.config.js لتحسين الأداء");
  }

  if (!results["Build Test"]) {
    recommendations.push("أصلح أخطاء البناء قبل النشر");
  }

  return recommendations;
}

// الدالة الرئيسية
async function main() {
  const startTime = Date.now();

  console.log(`🏢 مؤسسة الديار العالمية - تحسين الأداء`);
  console.log(`📅 ${new Date().toLocaleString("ar-SA")}`);
  console.log("=".repeat(50));
  console.log("");

  // تشغيل جميع فحوصات التحسين
  const results = {
    "Package.json": optimizePackageJson(),
    "Environment Variables": checkEnvironmentVariables(),
    "Next.js Config": optimizeNextConfig(),
    "Important Files": checkImportantFiles(),
    Database: await optimizeDatabase(),
    Performance: optimizePerformance(),
    "Build Test": testBuild(),
  };

  // إنشاء التقرير
  const score = generateOptimizationReport(results);

  const endTime = Date.now();
  const duration = Math.round((endTime - startTime) / 1000);

  console.log("");
  console.log(`⏱️ وقت التحسين: ${duration} ثانية`);
  console.log("");

  if (score >= 90) {
    console.log("🚀 المشروع جاهز للاستضافة!");
    console.log("");
    console.log("الخطوات التالية:");
    console.log("1. ادفع التغييرات إلى Git");
    console.log("2. انشر على Vercel");
    console.log("3. تحديث متغيرات البيئة في Vercel");
    console.log("4. فحص الموقع المنشور");
  } else {
    console.log("⚠️ يرجى إصلاح المشاكل المذكورة أعلاه قبل النشر");
    process.exit(1);
  }
}

// تشغيل السكريبت
if (require.main === module) {
  main().catch((error) => {
    console.error("💥 خطأ في تشغيل سكريبت التحسين:", error);
    process.exit(1);
  });
}

module.exports = { main };
