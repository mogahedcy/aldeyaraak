#!/usr/bin/env node

/**
 * Environment Verification Script
 * تحقق من صحة إعدادات متغيرات البيئة
 */

const { config } = require("dotenv");
const { resolve } = require("path");

// تحميل متغيرات البيئة
config({ path: resolve(__dirname, "../.env.local") });

console.log("🔍 فحص إعدادات البيئة...\n");

const checks = [
  {
    name: "قاعدة البيانات",
    key: "DATABASE_URL",
    test: (value) => value && value.startsWith("postgresql://"),
    required: true,
  },
  {
    name: "Cloudinary Cloud Name",
    key: "CLOUDINARY_CLOUD_NAME",
    test: (value) => value && value.length > 3,
    required: true,
  },
  {
    name: "Cloudinary API Key",
    key: "CLOUDINARY_API_KEY",
    test: (value) => value && /^\d+$/.test(value),
    required: true,
  },
  {
    name: "Cloudinary API Secret",
    key: "CLOUDINARY_API_SECRET",
    test: (value) => value && value.length > 10,
    required: true,
  },
  {
    name: "JWT Secret",
    key: "JWT_SECRET",
    test: (value) => value && value.length >= 32,
    required: true,
  },
  {
    name: "NextAuth Secret",
    key: "NEXTAUTH_SECRET",
    test: (value) => value && value.length >= 20,
    required: true,
  },
  {
    name: "NextAuth URL",
    key: "NEXTAUTH_URL",
    test: (value) =>
      value && (value.startsWith("http://") || value.startsWith("https://")),
    required: true,
  },
  {
    name: "Node Environment",
    key: "NODE_ENV",
    test: (value) => ["development", "production", "test"].includes(value),
    required: false,
  },
];

let allPassed = true;
let warnings = 0;

checks.forEach((check) => {
  const value = process.env[check.key];
  const exists = Boolean(value);
  const valid = exists && check.test(value);

  let status;
  let icon;

  if (!exists && check.required) {
    status = "مفقود";
    icon = "❌";
    allPassed = false;
  } else if (!valid && check.required) {
    status = "غير صحيح";
    icon = "❌";
    allPassed = false;
  } else if (!valid && !check.required) {
    status = "تحذير";
    icon = "⚠️";
    warnings++;
  } else {
    status = "صحيح";
    icon = "✅";
  }

  const displayValue = exists
    ? check.key.includes("SECRET") || check.key.includes("PASSWORD")
      ? "*".repeat(Math.min(value.length, 20))
      : value.length > 50
        ? value.substring(0, 47) + "..."
        : value
    : "غير موجود";

  console.log(`${icon} ${check.name}: ${status}`);
  if (check.required || exists) {
    console.log(`   ${check.key}=${displayValue}\n`);
  }
});

// Test database connection
console.log("\n🔗 اختبار الاتصالات...\n");

async function testDatabaseConnection() {
  try {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    await prisma.$connect();
    console.log("✅ الاتصال بقاعدة البيانات: نجح");
    await prisma.$disconnect();
  } catch (error) {
    console.log("❌ الاتصال بقاعدة البيانات: فشل");
    console.log(`   الخطأ: ${error.message}`);
    allPassed = false;
  }
}

async function testCloudinaryConnection() {
  try {
    const https = require("https");
    const auth = Buffer.from(
      `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
    ).toString("base64");

    const options = {
      hostname: "api.cloudinary.com",
      port: 443,
      path: `/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/usage`,
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log("✅ الاتصال بـ Cloudinary: نجح");
      } else {
        console.log("❌ الاتصال بـ Cloudinary: فشل");
        console.log(`   كود الحالة: ${res.statusCode}`);
        allPassed = false;
      }
    });

    req.on("error", (error) => {
      console.log("❌ الاتصال بـ Cloudinary: فشل");
      console.log(`   الخطأ: ${error.message}`);
      allPassed = false;
    });

    req.end();
  } catch (error) {
    console.log("❌ الاتصال بـ Cloudinary: فشل");
    console.log(`   الخطأ: ${error.message}`);
    allPassed = false;
  }
}

// Test JWT generation
function testJWT() {
  try {
    const jwt = require("jsonwebtoken");
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign({ test: true }, secret, { expiresIn: "1h" });
    const decoded = jwt.verify(token, secret);

    if (decoded.test) {
      console.log("✅ JWT: يعمل بشكل صحيح");
    } else {
      console.log("❌ JWT: فشل في فك التشفير");
      allPassed = false;
    }
  } catch (error) {
    console.log("❌ JWT: فشل");
    console.log(`   الخطأ: ${error.message}`);
    allPassed = false;
  }
}

// Run tests
async function runTests() {
  await testDatabaseConnection();
  await testCloudinaryConnection();
  testJWT();

  // Summary
  console.log("\n📊 ملخص الفحص:\n");

  if (allPassed && warnings === 0) {
    console.log("🎉 تهانينا! جميع الإعدادات صحيحة ومكتملة.");
    console.log("🚀 يمكنك الآن تشغيل المشروع بأمان.");
    process.exit(0);
  } else if (allPassed && warnings > 0) {
    console.log(`⚠️ الإعدادات الأساسية صحيحة، لكن هناك ${warnings} تحذير.`);
    console.log("🚀 يمكنك تشغيل المشروع، لكن راجع التحذيرات.");
    process.exit(0);
  } else {
    console.log("❌ هناك مشاكل في الإعدادات يجب حلها قبل التشغيل.");
    console.log("📖 راجع ملف ENVIRONMENT_SETUP.md للمساعدة.");
    process.exit(1);
  }
}

runTests();
