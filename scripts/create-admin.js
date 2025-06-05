
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // التحقق من وجود حساب إدارة مسبقاً
    const existingAdmin = await prisma.admin.findFirst();
    
    if (existingAdmin) {
      console.log('✅ يوجد حساب إدارة مسبقاً');
      console.log(`📧 اسم المستخدم: ${existingAdmin.username}`);
      return;
    }

    // إنشاء حساب إدارة جديد
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.admin.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        email: 'admin@aldeyar.com'
      }
    });

    console.log('🎉 تم إنشاء حساب الإدارة بنجاح!');
    console.log('📧 اسم المستخدم: admin');
    console.log('🔑 كلمة المرور: admin123');
    console.log('⚠️  يُرجى تغيير كلمة المرور بعد تسجيل الدخول');

  } catch (error) {
    console.error('❌ خطأ في إنشاء حساب الإدارة:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
