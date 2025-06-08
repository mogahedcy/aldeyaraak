"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fill?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  fill = false,
  sizes,
  onLoad,
  onError,
  lazy = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // تحسين URL الصورة إذا كانت من Cloudinary
  const optimizeCloudinaryUrl = (url: string) => {
    if (url.includes("cloudinary.com")) {
      // إضافة تحسينات Cloudinary
      const transformations = [
        "f_auto", // تنسيق تلقائي (WebP/AVIF)
        "q_auto:good", // جودة تلقائية
        "c_fill", // قص ذكي
        "g_auto", // تركيز تلقائي
      ];

      // إدراج التحسينات في URL
      return url.replace("/upload/", `/upload/${transformations.join(",")}/`);
    }
    return url;
  };

  // إنشاء placeholder مشفر بـ base64
  const createBlurDataURL = (width: number = 10, height: number = 10) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // تدرج رمادي بسيط
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#f3f4f6");
      gradient.addColorStop(1, "#e5e7eb");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    return canvas.toDataURL();
  };

  useEffect(() => {
    setImageSrc(optimizeCloudinaryUrl(src));
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);

    // محاولة تحميل صورة بديلة
    const fallbackUrl = "/images/placeholder.jpg";
    if (imageSrc !== fallbackUrl) {
      setImageSrc(fallbackUrl);
      setHasError(false);
    }

    onError?.();
  };

  // حساب الأحجام التلقائية للاستجابة
  const responsiveSizes =
    sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          className,
        )}
        style={{ width, height }}
      >
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* طبقة التحميل */}
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center",
            fill ? "w-full h-full" : "",
          )}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}

      {/* الصورة المحسنة */}
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={responsiveSizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL || createBlurDataURL()}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          fill ? "object-cover" : "",
        )}
        {...(lazy && { loading: "lazy" })}
        {...props}
      />
    </div>
  );
}

// مكون صورة تفاعلية مع تكبير
interface InteractiveImageProps extends OptimizedImageProps {
  zoomable?: boolean;
  showOverlay?: boolean;
  overlayContent?: React.ReactNode;
}

export function InteractiveImage({
  zoomable = false,
  showOverlay = false,
  overlayContent,
  className,
  ...props
}: InteractiveImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-transform duration-300",
        zoomable && "hover:scale-105",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <OptimizedImage
        className={cn(
          "transition-all duration-300",
          zoomable && "group-hover:scale-110",
        )}
        {...props}
      />

      {/* Overlay */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 flex items-center justify-center",
            isHovered && "bg-opacity-50",
          )}
        >
          {overlayContent && isHovered && (
            <div className="text-white text-center p-4 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
              {overlayContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OptimizedImage;
