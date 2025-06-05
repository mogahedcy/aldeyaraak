import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'تسجيل الدخول | محترفين الديار العالمية',
  description: 'تسجيل دخول لوحة التحكم',
  robots: 'noindex, nofollow',
};

export default function LoginPage() {
  return <LoginForm />;
}
