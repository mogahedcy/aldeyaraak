/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output للاستضافة المحسنة
  output: "standalone",

  // تحسين الترجمة والتجميع
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  // تحسين حزم الخادم الخارجية
  serverExternalPackages: ["@prisma/client", "bcryptjs", "sharp"],

  // تحسين الصور بشكل كبير
  images: {
    // إلغاء تعطيل تحسين الصور لتحسين الأداء
    unoptimized: false,

    // تحسين التنسيقات
    formats: ["image/webp", "image/avif"],

    // أحجام محسنة للأجهزة المختلفة
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // النطاقات المسموح بها
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "aldeyarksa.tech",
      "res.cloudinary.com",
      "dj6gk4wmy.cloudinary.com",
    ],

    // أنماط النطاقات المسموحة
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "aldeyarksa.tech",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dj6gk4wmy.cloudinary.com",
        pathname: "/**",
      },
    ],

    // تحسين الذاكرة المؤقتة للصور
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // تفعيل ضغط البيانات
  compress: true,

  // إزالة powered-by header للأمان
  poweredByHeader: false,

  // تفعيل ETags للتخزين المؤقت
  generateEtags: true,

  // عدم إضافة trailing slash
  trailingSlash: false,

  // تحسين webpack للأداء (فقط عندما لا يُستخدم Turbopack)
  ...(process.env.TURBOPACK !== "1" && {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // تحسين التجميع
      if (!dev && !isServer) {
        // تقسيم البرامج للتحميل المحسن
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            // تجميع مكتبات React
            react: {
              name: "react",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 20,
            },
            // تجميع مكتبات UI
            ui: {
              name: "ui",
              chunks: "all",
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|framer-motion)[\\/]/,
              priority: 15,
            },
            // تجميع مكتبات أخرى
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
            },
          },
        };
      }

      // تحسين أداء البناء
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      return config;
    },
  }),

  // Headers محسنة للأمان والأداء
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // تحسين cache للصور والأصول الثابتة
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // تحسين cache للـ API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
      {
        // تحسين cache للصفحات الثابتة
        source: "/(about|privacy|terms|faq)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
        ],
      },
    ];
  },

  // إعادة التوجيه المحسنة
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/خدماتنا",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/معرض-الاعمال",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/تواصل-معنا",
        destination: "/contact",
        permanent: true,
      },
    ];
  },

  // إعادة الكتابة للـ API
  async rewrites() {
    return [
      {
        source: "/api/health",
        destination: "/api/health-check",
      },
    ];
  },

  // تحسين TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // تحسين ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
