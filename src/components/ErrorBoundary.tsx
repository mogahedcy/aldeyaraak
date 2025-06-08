"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showErrorDetails?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// مكون Error Boundary لالتقاط الأخطاء
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // تحديث الحالة عند حدوث خطأ
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // تسجيل الخطأ
    console.error("Error Boundary اشتعل خطأ:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // إرسال الخطأ لخدمة المراقبة (مثل Sentry)
    if (process.env.NODE_ENV === "production") {
      this.logErrorToService(error, errorInfo);
    }
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // إرسال الخطأ لخدمة المراقبة
    try {
      // يمكن إضافة Sentry أو أي خدمة مراقبة أخرى هنا
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      // إرسال التقرير (يمكن تخصيصه حسب الخدمة المستخدمة)
      fetch("/api/error-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorReport),
      }).catch(console.error);
    } catch (reportingError) {
      console.error("فشل في إرسال تقرير الخطأ:", reportingError);
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      // عرض fallback مخصص إذا تم تمريره
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // عرض صفحة خطأ افتراضية
      return (
        <div
          className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
          dir="rtl"
        >
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              {/* أيقونة الخطأ */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>

              {/* رسالة الخطأ */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                عذراً، حدث خطأ غير متوقع
              </h1>

              <p className="text-gray-600 mb-6">
                نعتذر عن هذا الإزعاج. يرجى المحاولة مرة أخرى أو العودة للصفحة
                الرئيسية.
              </p>

              {/* تفاصيل الخطأ (في التطوير فقط) */}
              {this.props.showErrorDetails &&
                process.env.NODE_ENV === "development" &&
                this.state.error && (
                  <details className="mb-6 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                      عرض تفاصيل الخطأ (للمطورين)
                    </summary>
                    <div className="bg-gray-100 p-4 rounded text-xs font-mono overflow-auto max-h-32">
                      <p className="text-red-600 font-bold">
                        {this.state.error.message}
                      </p>
                      {this.state.error.stack && (
                        <pre className="mt-2 text-gray-700">
                          {this.state.error.stack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}

              {/* أزرار الإجراءات */}
              <div className="space-y-3">
                <Button
                  onClick={this.handleRetry}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <RefreshCw className="w-4 h-4 ml-2" />
                  محاولة مرة أخرى
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full"
                >
                  <Home className="w-4 h-4 ml-2" />
                  العودة للصفحة الرئيسية
                </Button>
              </div>

              {/* معلومات الدعم */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  إذا استمر الخطأ، يرجى التواصل مع الدعم الفني
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-400">
                    📞 هاتف: +966 55 371 9009
                  </p>
                  <p className="text-xs text-gray-400">
                    ✉️ بريد: info@aldeyar-jeddah.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// مكون Error Boundary مبسط للاستخدام السريع
export function SimpleErrorBoundary({
  children,
  message = "حدث خطأ في تحميل هذا المحتوى",
}: {
  children: ReactNode;
  message?: string;
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-800 font-medium">{message}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 ml-2" />
            إعادة المحاولة
          </Button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundary;
