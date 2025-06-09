#!/usr/bin/env node

/**
 * مؤسسة الديار العالمية - Database Setup Script
 * سكريبت إعداد وربط قاعدة البيانات
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🗄️ إعدا�� قاعدة بيانات مؤسسة الديار العالمية...\n');

// دالة لتشغيل أوامر shell
function runCommand(command, description, options = {}) {
  try {
    console.log(`📋 ${description}...`);
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    console.log(`✅ ${description} مكتمل\n`);
    return { success: true, output };
  } catch (error) {
    console.error(`❌ فشل في ${description}:`, error.message);
    return { success: false, error: error.message };
  }
}

// فحص متغيرات البيئة
function checkEnvironmentVariables() {
  console.log('🔧 فحص متغيرات البيئة...');
  
  const requiredVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'NEXTAUTH_SECRET'
  ];

  const missingVars = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.log(`❌ متغيرات البيئة المفقودة: ${missingVars.join(', ')}`);
    console.log('💡 تأكد من وجود ملف .env مع القيم المطلوبة');
    return false;
  }

  console.log('✅ جميع متغيرات البيئة متوفرة');
  console.log(`📍 قاعدة البيانات: ${process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'غير محدد'}\n`);
  return true;
}

// فحص ملف schema
function checkPrismaSchema() {
  console.log('📝 فحص Prisma schema...');
  
  const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
  
  if (!fs.existsSync(schemaPath)) {
    console.log('❌ prisma/schema.prisma غير موجود');
    return false;
  }

  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  
  // فحص النماذج المطلوبة
  const requiredModels = ['Project', 'MediaItem', 'Admin', 'Comment'];
  const missingModels = [];
  
  for (const model of requiredModels) {
    if (!schemaContent.includes(`model ${model}`)) {
      missingModels.push(model);
    }
  }

  if (missingModels.length > 0) {
    console.log(`❌ نماذج مفقودة في schema: ${missingModels.join(', ')}`);
    return false;
  }

  console.log('✅ Prisma schema صحيح ويحتوي على جميع النماذج المطلوبة\n');
  return true;
}

// توليد Prisma Client
async function generatePrismaClient() {
  console.log('⚙️ توليد Prisma Client...');
  
  const result = runCommand('npx prisma generate', 'توليد Prisma Client');
  return result.success;
}

// إنشاء قاعدة البيانات وتطبيق المخطط
async function setupDatabase() {
  console.log('🏗️ إعداد قاعدة البيانات...');
  
  // محاولة push للمخطط (بدلاً من migrate في التطوير)
  const pushResult = runCommand(
    'npx prisma db push', 
    'تطبيق مخطط قاعدة البيانات'
  );
  
  if (!pushResult.success) {
    console.log('⚠️ فشل في push، محاولة إنشاء migration...');
    
    // محاولة إنشاء migration جديدة
    const migrateResult = runCommand(
      'npx prisma migrate dev --name init', 
      'إنشاء migration أولية'
    );
    
    return migrateResult.success;
  }
  
  return true;
}

// اختبار الاتصال بقاعدة البيانات
async function testDatabaseConnection() {
  console.log('📡 اختبار الاتصال بقاعدة البيانات...');
  
  try {
    // إنشاء script اختبار مؤقت
    const testScript = `
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    // اختبار الاتصال
    await prisma.$connect();
    console.log('✅ الاتصال بقاعدة البيانات نجح');
    
    // اختبار استعلام بسيط
    const projectCount = await prisma.project.count();
    console.log(\`📊 عدد المشاريع الحالي: \${projectCount}\`);
    
    // اختبار إنشاء admin إذا لم يكن موجود
    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
      console.log('👤 إنشاء حساب admin افتراضي...');
      
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await prisma.admin.create({
        data: {
          username: 'admin',
          password: hashedPassword,
          email: 'admin@aldeyar-jeddah.com'
        }
      });
      
      console.log('✅ تم إنشاء حساب admin افتراضي');
      console.log('📧 Username: admin');
      console.log('🔑 Password: admin123');
      console.log('⚠️ يُنصح بتغيير كلمة المرور بعد تسجيل الدخول');
    } else {
      console.log(\`👥 يوجد \${adminCount} حساب admin في النظام\`);
    }
    
    await prisma.$disconnect();
    console.log('✅ تم إغلاق الاتصال بنجاح');
    
  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();
`;

    // كتابة وتشغيل script الاختبار
    fs.writeFileSync('/tmp/test-db.js', testScript);
    const testResult = runCommand('node /tmp/test-db.js', 'اختبار الاتصال بقاعدة البيانات');
    
    // حذف الملف المؤقت
    try {
      fs.unlinkSync('/tmp/test-db.js');
    } catch (error) {
      // تجاهل أخطاء الحذف
    }
    
    return testResult.success;
    
  } catch (error) {
    console.error('❌ خطأ في إنشاء اختبار الاتصال:', error);
    return false;
  }
}

// إنشاء بيانات تجريبية (اختياري)
async function seedDatabase() {
  console.log('🌱 إضافة بيانات تجريبية...');
  
  const seedScript = `
const { PrismaClient } = require('@prisma/client');

async function seed() {
  const prisma = new PrismaClient();
  
  try {
    // فحص إذا كانت هناك مشاريع موجودة
    const existingProjects = await prisma.project.count();
    
    if (existingProjects > 0) {
      console.log('📊 يوجد مشاريع في قاعدة البيانات، تخطي إضافة البيانات التجريبية');
      return;
    }
    
    console.log('🏗️ إضافة مشاريع تجريبية...');
    
    // إنشاء مشاريع تجريبية
    const sampleProjects = [
      {
        title: 'مظلة سيارات فيلا الرياض',
        description: 'تركيب مظلة سي��رات عالية الجودة مع هيكل حديدي مجلفن وقماش PVC مقاوم للأشعة',
        category: 'مظلات',
        location: 'حي الصفا، جدة',
        client: 'عائلة الأحمدي',
        projectDuration: '3 أيام',
        projectCost: '8,500 ريال',
        featured: true,
        completionDate: new Date('2024-01-15'),
      },
      {
        title: 'برجولة حديقة منزلية',
        description: 'تصميم وتنفيذ برجولة خشبية أنيقة للحديقة المنزلية مع إضاءة LED متكاملة',
        category: 'برجولات',
        location: 'حي النزهة، جدة',
        client: 'عائلة العتيبي',
        projectDuration: '5 أيام',
        projectCost: '12,000 ريال',
        featured: true,
        completionDate: new Date('2024-01-20'),
      },
      {
        title: 'سواتر خصوصية للمنزل',
        description: 'تركيب سواتر خصوصية عالية الجودة لحماية الخصوصية مع تصميم عصري',
        category: 'سواتر',
        location: 'حي الروضة، جدة',
        client: 'الأستاذ محمد الغامدي',
        projectDuration: '2 أيام',
        projectCost: '6,800 ريال',
        featured: false,
        completionDate: new Date('2024-01-25'),
      }
    ];
    
    for (const project of sampleProjects) {
      const createdProject = await prisma.project.create({
        data: {
          ...project,
          tags: {
            create: [
              { name: project.category },
              { name: 'جودة عالية' },
              { name: 'تركيب سريع' }
            ]
          },
          materials: {
            create: [
              { name: 'حديد مجلفن' },
              { name: 'قماش PVC' },
              { name: 'براغي ستانلس ستيل' }
            ]
          }
        }
      });
      
      console.log(\`✅ تم إنشاء مشروع: \${createdProject.title}\`);
    }
    
    console.log('🎉 تم إضافة البيانات التجريبية بنجاح');
    
  } catch (error) {
    console.error('❌ خطأ في إضافة البيانات التجريبية:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
`;

  // كتابة وتشغيل script البذر
  fs.writeFileSync('/tmp/seed-db.js', seedScript);
  const seedResult = runCommand('node /tmp/seed-db.js', 'إضافة البيانات التجريبية');
  
  // حذف الملف المؤقت
  try {
    fs.unlinkSync('/tmp/seed-db.js');
  } catch (error) {
    // تجاهل أخطاء الحذف
  }
  
  return seedResult.success;
}

// الدالة الرئيسية
async function main() {
  console.log('🚀 بدء إعداد قاعدة البيانات...\n');
  
  const steps = [
    { name: 'فحص متغيرات البيئة', func: checkEnvironmentVariables },
    { name: 'فحص Prisma Schema', func: checkPrismaSchema },
    { name: 'توليد Prisma Client', func: generatePrismaClient },
    { name: 'إعداد قاعدة البيانات', func: setupDatabase },
    { name: 'اختبار الاتصال', func: testDatabaseConnection },
    { name: 'إضافة بيانات تجريبية', func: seedDatabase }
  ];
  
  let allSuccessful = true;
  
  for (const step of steps) {
    const result = await step.func();
    if (!result) {
      console.log(\`❌ فشل في: \${step.name}\`);
      allSuccessful = false;
      
      // توقف في حالة فشل الخطوات الأساسية
      if (['فحص متغيرات البيئة', 'فحص Prisma Schema', 'توليد Prisma Client'].includes(step.name)) {
        break;
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allSuccessful) {
    console.log('🎉 تم إعداد قاعدة البيانات بنجاح!');
    console.log('\n📋 الخطوات التالية:');
    console.log('1. تشغيل الخادم: npm run dev');
    console.log('2. زيارة لوحة التحكم: http://localhost:3000/dashboard');
    console.log('3. تسجيل الدخول بـ: admin / admin123');
    console.log('4. إضافة مشاريع جديدة');
    console.log('\n💡 تذكر تغيير كلمة مرور الـ admin من الإعدادات');
  } else {
    console.log('⚠️ حدثت بعض المشاكل أثناء الإعداد');
    console.log('يرجى مراجعة الأخطاء أعلاه وإصلاحها');
  }
  
  console.log('');
}

// تشغيل السكريبت
if (require.main === module) {
  main().catch(error => {
    console.error('💥 خطأ في إعداد قاعدة البيان��ت:', error);
    process.exit(1);
  });
}

module.exports = { main };