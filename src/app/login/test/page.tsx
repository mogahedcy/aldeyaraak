import type { Metadata } from 'next';
import LoginTestPage from '@/components/LoginTestPage';

export const metadata: Metadata = {
  title: 'اختبار تسجيل الدخول | محترفين الديار العالمية',
  description: 'صفحة اختبار نظام تسجيل الدخول',
  robots: 'noindex, nofollow',
};

export default function LoginTestPageRoute() {
  return <LoginTestPage />;
}
