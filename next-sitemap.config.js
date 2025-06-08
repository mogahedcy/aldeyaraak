/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aldeyarksa.tech",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/dashboard/*", "/login/*", "/api/*", "/test-*", "/admin/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/login/",
          "/api/",
          "/test-*",
          "/admin/",
          "/private/",
          "/*?*utm_*",
          "/*?*fbclid*",
          "/*?*gclid*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/", "/login/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/dashboard/", "/login/", "/api/"],
      },
    ],
    additionalSitemaps: ["https://aldeyarksa.tech/sitemap.xml"],
  },
  transform: async (config, path) => {
    // تخصيص خصائص الصفحات
    const customPriorities = {
      "/": 1.0,
      "/about": 0.8,
      "/services/*": 0.9,
      "/portfolio": 0.8,
      "/contact": 0.7,
      "/quote": 0.7,
      "/faq": 0.6,
      "/privacy": 0.3,
      "/terms": 0.3,
    };

    const customChangefreq = {
      "/": "daily",
      "/portfolio": "weekly",
      "/services/*": "monthly",
      "/about": "monthly",
      "/contact": "monthly",
      "/faq": "monthly",
      "/privacy": "yearly",
      "/terms": "yearly",
    };

    // العثور على الأولوية المناسبة
    let priority = 0.5;
    let changefreq = "monthly";

    for (const [pattern, value] of Object.entries(customPriorities)) {
      if (pattern.includes("*")) {
        const regex = new RegExp(pattern.replace("*", ".*"));
        if (regex.test(path)) {
          priority = value;
          break;
        }
      } else if (path === pattern) {
        priority = value;
        break;
      }
    }

    for (const [pattern, value] of Object.entries(customChangefreq)) {
      if (pattern.includes("*")) {
        const regex = new RegExp(pattern.replace("*", ".*"));
        if (regex.test(path)) {
          changefreq = value;
          break;
        }
      } else if (path === pattern) {
        changefreq = value;
        break;
      }
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `https://aldeyarksa.tech${path}`,
          hreflang: "ar",
        },
        {
          href: `https://aldeyarksa.tech${path}`,
          hreflang: "ar-SA",
        },
      ],
    };
  },
  additionalPaths: async (config) => {
    // إضافة مسارات ديناميكية
    const dynamicPaths = [];

    // إضافة صفحات الخدمات
    const services = [
      "mazallat",
      "sawater",
      "pergolas",
      "khayyam",
      "byoot-shaar",
      "sandwich-panel",
      "landscaping",
      "renovation",
    ];

    services.forEach((service) => {
      dynamicPaths.push({
        loc: `/services/${service}`,
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });

    // يمكن إضافة مسارات المشاريع هنا إذا كانت متاحة
    try {
      // const projects = await fetchProjects() // جلب من API
      // projects.forEach(project => {
      //   dynamicPaths.push({
      //     loc: `/portfolio/${project.id}`,
      //     changefreq: 'weekly',
      //     priority: 0.8,
      //     lastmod: project.updatedAt,
      //   })
      // })
    } catch (error) {
      console.log("تعذر جلب المشاريع للـ sitemap");
    }

    return dynamicPaths;
  },
};
