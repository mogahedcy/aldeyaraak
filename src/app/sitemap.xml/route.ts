
import { prisma } from '@/lib/prisma';

export async function GET() {
  const baseUrl = 'https://aldeyarksa.tech';

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/services/mazallat', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/pergolas', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/sawater', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/sandwich-panel', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/renovation', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/landscaping', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/byoot-shaar', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/khayyam', priority: '0.9', changefreq: 'weekly' },
    { url: '/portfolio', priority: '0.8', changefreq: 'daily' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/articles', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/quote', priority: '0.8', changefreq: 'monthly' },
    { url: '/faq', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  // جلب جميع المشاريع مع الوسائط
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
      createdAt: true,
      mediaItems: {
        select: {
          src: true,
          type: true,
          alt: true,
          updatedAt: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const staticSitemap = staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('');

  // إضافة صفحات المشاريع مع الصور والفيديوهات
  const projectsSitemap = projects
    .map(
      (project) => {
        const images = project.mediaItems
          .filter(media => media.type === 'IMAGE')
          .map(media => `
      <image:image>
        <image:loc>${media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`}</image:loc>
        <image:caption>${media.alt || project.title}</image:caption>
        <image:title>${project.title}</image:title>
      </image:image>`)
          .join('');

        const videos = project.mediaItems
          .filter(media => media.type === 'VIDEO')
          .map(media => `
      <video:video>
        <video:content_loc>${media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`}</video:content_loc>
        <video:title>${project.title}</video:title>
        <video:description>${project.description || project.title}</video:description>
      </video:video>`)
          .join('');

        return `
  <url>
    <loc>${baseUrl}/portfolio/${project.id}</loc>
    <lastmod>${project.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${images}${videos}
  </url>`;
      }
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${staticSitemap}
  ${projectsSitemap}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
