'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VideoTestPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
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
      setMessage(`تم اختيار: ${file.name} (${file.type})`);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setMessage('جاري الرفع...');

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
        const uploadedFile = result.files?.[0] || result;
        setUploadedUrl(uploadedFile.src || uploadedFile.url);
        setMessage('تم الرفع بنجاح!');
      } else {
        setMessage(`خطأ: ${result.error}`);
      }
    } catch (error) {
      console.error('خطأ في الرفع:', error);
      setMessage('خطأ في الرفع');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>اختبار رفع الفيديو</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* اختيار الملف */}
            <div>
              <label className="block text-sm font-medium mb-2">
                اختر ملف فيديو:
              </label>
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="w-full"
              />
            </div>

            {/* معلومات الملف */}
            {selectedFile && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">معلومات الملف:</h3>
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
            >
              {isUploading ? 'جاري الرفع...' : 'رفع الفيديو'}
            </Button>

            {/* رسالة الحالة */}
            {message && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p>{message}</p>
              </div>
            )}

            {/* معاينة الفيديو المرفوع */}
            {uploadedUrl && (
              <div className="space-y-4">
                <h3 className="font-medium">معاينة الفيديو المرفوع:</h3>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <video
                    src={uploadedUrl}
                    controls
                    preload="metadata"
                    className="w-full max-h-96 object-contain"
                    onError={(e) => {
                      console.log('خطأ في تحميل الفيديو:', e);
                      setMessage('خطأ في عرض الفيديو');
                    }}
                    onLoadedData={() => {
                      console.log('تم تحميل الفيديو بنجاح');
                      setMessage('تم عرض الفيديو بنجاح!');
                    }}
                  >
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                </div>
                <p className="text-sm text-gray-600">رابط الفيديو: {uploadedUrl}</p>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
