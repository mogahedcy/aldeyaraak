import NewLoginForm from "@/components/NewLoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول | محترفين الديار العالمية",
  description: "تسجيل دخول لوحة التحكم",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NewLoginForm />
    </div>
  );
}
