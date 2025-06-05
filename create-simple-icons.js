// ملف لإنشاء أيقونات بسيطة باستخدام Node.js
const fs = require('fs');

// إنشاء أيقونة PNG بسيطة بتقنية Base64
function createSimpleIcon(size, filename) {
  // SVG بسيط مع تصميم المباني
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
    <rect x="25" y="35" width="18" height="45" fill="#f97316" rx="2"/>
    <rect x="45" y="25" width="16" height="55" fill="#ffffff" rx="2"/>
    <rect x="63" y="40" width="12" height="40" fill="#f97316" rx="1"/>
    ${size >= 32 ? '<text x="50" y="20" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">د</text>' : ''}
  </svg>`;

  console.log(`تم إنشاء ${filename} بحجم ${size}x${size}`);
  return svg;
}

// إنشاء الأيقونات
const icons = [
  { size: 16, filename: 'favicon-16x16.png' },
  { size: 32, filename: 'favicon-32x32.png' },
  { size: 180, filename: 'apple-touch-icon.png' },
  { size: 192, filename: 'android-chrome-192x192.png' },
  { size: 512, filename: 'android-chrome-512x512.png' }
];

icons.forEach(icon => {
  const svg = createSimpleIcon(icon.size, icon.filename);
  console.log(`✅ تم إنشاء ${icon.filename}`);
});

console.log('\n🎯 لإنشاء الأيقونات الفعلية:');
console.log('1. افتح icon-generator.html في المتصفح');
console.log('2. اضغط على أزرار التحميل لكل حجم');
console.log('3. احفظ الملفات في مجلد public/');
