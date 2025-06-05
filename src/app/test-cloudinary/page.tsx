'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestCloudinaryPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('ملف محدد:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
      setSelectedFile(file);
      setUploadResult(null);
      setMessage(`تم اختيار: ${file.name} (${file.type})`);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setMessage('جاري الرفع إلى Cloudinary...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('نتيجة الرفع:', result);

      if (response.ok) {
        setUploadResult(result);
        const storageType = result.storage_type || 'unknown';
        setMessage(`✅ تم الرفع بنجاح عبر ${storageType === 'cloudinary' ? 'Cloudinary ☁️' : 'التخزين المحلي 💾'}!`);
      } else {
        setMessage(`❌ خطأ: ${result.error}`);
      }
    } catch (error) {
      console.error('خطأ في الرفع:', error);
      setMessage('❌ خطأ في الرفع');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>🧪 اختبار Cloudinary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* اختيار الملف */}
            <div>
              <label className="block text-sm font-medium mb-2">
                اختر صورة أو فيديو:
              </label>
              <Input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="w-full"
              />
            </div>

            {/* معلومات الملف */}
            {selectedFile && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">📋 معلومات الملف:</h3>
                <ul className="text-sm space-y-1">
                  <li><strong>الاسم:</strong> {selectedFile.name}</li>
                  <li><strong>النوع:</strong> {selectedFile.type}</li>
                  <li><strong>الحجم:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</li>
                </ul>
              </div>
            )}

            {/* زر الرفع */}
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full"
              size="lg"
            >
              {isUploading ? '⏳ جاري الرفع...' : '🚀 رفع إلى Cloudinary'}
            </Button>

            {/* رسالة الحالة */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('✅') ? 'bg-green-50 text-green-800' :
                message.includes('❌') ? 'bg-red-50 text-red-800' :
                'bg-blue-50 text-blue-800'
              }`}>
                <p className="font-medium">{message}</p>
              </div>
            )}

            {/* نتائج الرفع */}
            {uploadResult && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">📊 نتائج الرفع:</h3>

                {/* معلومات التخزين */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>نوع التخزين:</strong> {uploadResult.storage_type === 'cloudinary' ? '☁️ Cloudinary' : '💾 محلي'}</div>
                    <div><strong>عدد الملفات:</strong> {uploadResult.count}</div>
                  </div>
                </div>

                {/* عرض الملف المرفوع */}
                {uploadResult.files && uploadResult.files[0] && (
                  <div className="space-y-3">
                    <h4 className="font-medium">🖼️ الملف المرفوع:</h4>

                    {/* معاينة */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      {uploadResult.files[0].type === 'IMAGE' ? (
                        <img
                          src={uploadResult.files[0].src}
                          alt="صورة مرفوعة"
                          className="w-full max-h-96 object-contain"
                          onError={(e) => {
                            console.log('خطأ في تحميل الصورة:', e);
                          }}
                        />
                      ) : (
                        <video
                          src={uploadResult.files[0].src}
                          controls
                          preload="metadata"
                          className="w-full max-h-96 object-contain"
                          onError={(e) => {
                            console.log('خطأ في تحميل الفيديو:', e);
                          }}
                        >
                          متصفحك لا يدعم تشغيل الفيديو
                        </video>
                      )}
                    </div>

                    {/* تفاصيل الملف */}
                    <div className="bg-gray-50 p-3 rounded text-xs space-y-1">
                      <div><strong>الرابط:</strong> <a href={uploadResult.files[0].src} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{uploadResult.files[0].src}</a></div>
                      {uploadResult.files[0].cloudinary_public_id && (
                        <div><strong>Cloudinary ID:</strong> {uploadResult.files[0].cloudinary_public_id}</div>
                      )}
                      <div><strong>الحجم:</strong> {uploadResult.files[0].size} bytes</div>
                      {uploadResult.files[0].width && (
                        <div><strong>الأبعاد:</strong> {uploadResult.files[0].width} x {uploadResult.files[0].height}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* روابط مفيدة */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">🔗 روابط مفيدة:</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <a href="/test-video" className="text-blue-600 hover:underline">
                    🎬 صفحة اختبار الفيديو التفصيلية
                  </a>
                </div>
                <div>
                  <a href="/dashboard/projects/add" className="text-blue-600 hover:underline">
                    ➕ إضافة مشروع جديد
                  </a>
                </div>
                <div>
                  <a href="/portfolio" className="text-blue-600 hover:underline">
                    🖼️ معرض الأعمال
                  </a>
                </div>
                <div>
                  <a href="https://console.cloudinary.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    ☁️ Cloudinary Dashboard
                  </a>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
