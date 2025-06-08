"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showErrorDetails?: boolean;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

// مكون Error Boundary محسن لالتقاط الأخطاء
export class ErrorBoundary extends Component<Props, State> {
  private retryTimeoutId?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // تحديث الحالة عند حدوث خطأ
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // تسجيل الخطأ
    console.error("🚨 Error Boundary اشتعل خطأ:", error);
    console.error("📋 معلومات الخطأ:", errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // استدعاء callback إضافي إذا تم تمريره
    this.props.onError?.(error, errorInfo);

    // إرسال الخطأ لخدمة المراقبة (مثل Sentry)
    if (process.env.NODE_ENV === "production") {
      this.logErrorToService(error, errorInfo);
    }
  }

  componentWillUnmount() {
    // تنظيف timeout عند إلغاء المكون
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  logErrorToService = async (error: Error, errorInfo: ErrorInfo) => {
    // إرسال الخطأ لخدمة المراقبة
    try {
      const errorReport = {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : "SSR",
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : "Unknown",
        props: {
          // إضافة معلومات Props بأمان (بدون البيانات الحساسة)
          showErrorDetails: this.props.showErrorDetails,
          hasFallback: !!this.props.fallback,
        },
      };

      // محاولة إرسال التقرير إلى API المحلي
      if (typeof fetch !== "undefined") {
        await fetch("/api/error-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(errorReport),
        }).catch((fetchError) => {
          console.error("فشل في إرسال تقرير الخطأ عبر fetch:", fetchError);
        });
      }
    } catch (reportingError) {
      console.error("فشل في إرسال تقرير الخطأ:", reportingError);
    }
  };

  handleRetry = () => {
    console.log("🔄 إعادة المحاولة...");
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined,
    });
  };

  handleGoHome = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // عرض fallback مخصص إذا تم تمريره
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // عرض صفحة خطأ افتراضية محسنة
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

              {/* رقم الخطأ للمرجعية */}
              {this.state.errorId && (
                <div className="bg-gray-100 rounded p-3 mb-6 text-xs">
                  <p className="text-gray-500">رقم المرجع:</p>
                  <p className="font-mono text-gray-700 break-all">
                    {this.state.errorId}
                  </p>
                </div>
              )}

              {/* تفاصيل الخطأ (في التطوير فقط) */}
              {this.props.showErrorDetails &&
                process.env.NODE_ENV === "development" &&
                this.state.error && (
                  <details className="mb-6 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                      عرض تفاصيل الخطأ (للمطورين)
                    </summary>
                    <div className="bg-gray-100 p-4 rounded text-xs font-mono overflow-auto max-h-40">
                      <p className="text-red-600 font-bold mb-2">
                        {this.state.error.name}: {this.state.error.message}
                      </p>
                      {this.state.error.stack && (
                        <pre className="text-gray-700 whitespace-pre-wrap">
                          {this.state.error.stack}
                        </pre>
                      )}
                      {this.state.errorInfo?.componentStack && (
                        <div className="mt-2 pt-2 border-t border-gray-300">
                          <p className="text-gray-600 font-bold mb-1">
                            Component Stack:
                          </p>
                          <pre className="text-gray-600 text-xs">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
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

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={this.handleGoHome}
                    variant="outline"
                    className="w-full"
                  >
                    <Home className="w-4 h-4 ml-1" />
                    الصفحة الرئيسية
                  </Button>

                  <Button
                    onClick={this.handleReload}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 ml-1" />
                    إعادة تحميل
                  </Button>
                </div>
              </div>

              {/* معلومات الدعم */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">
                  إذا استمر الخطأ، يرجى التواصل مع الدعم الفني
                </p>
                <div className="space-y-1">
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
  onError,
}: {
  children: ReactNode;
  message?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}) {
  return (
    <ErrorBoundary
      onError={onError}
      fallback={
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-800 font-medium mb-3">{message}</p>
          <Button
            variant="outline"
            size="sm"
            className="border-red-300 text-red-700 hover:bg-red-50"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
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

// Hook للاستخدام مع مكونات وظيفية
export function useErrorHandler() {
  return React.useCallback((error: Error, errorInfo?: any) => {
    console.error("🚨 خطأ تم التعامل معه:", error);

    // يمكن إرسال الخطأ لخدمة المراقبة هنا
    if (process.env.NODE_ENV === "production") {
      // إرسال لخدمة المراقبة
      fetch("/api/error-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          type: "manual_error",
          additionalInfo: errorInfo,
        }),
      }).catch(console.error);
    }
  }, []);
}

export default ErrorBoundary;
