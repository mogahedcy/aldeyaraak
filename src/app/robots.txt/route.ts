
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Important pages
Allow: /services/
Allow: /portfolio/
Allow: /about
Allow: /contact
Allow: /quote
Allow: /articles/

# Sitemaps
Sitemap: https://aldeyarksa.tech/sitemap.xml

# Block admin and development files
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /login
Disallow: /create-icons.html
Disallow: /icon-generator.html
Disallow: /test-*

# Allow media files for search engines
User-agent: Googlebot-Image
Allow: /images/
Allow: /uploads/
Allow: *.jpg
Allow: *.jpeg
Allow: *.png
Allow: *.webp
Allow: *.svg

User-agent: Googlebot-Video
Allow: /uploads/
Allow: *.mp4
Allow: *.webm

# Allow favicons and manifest
User-agent: *
Allow: /favicon.ico
Allow: /favicon.svg
Allow: /favicon-*.png
Allow: /apple-touch-icon.png
Allow: /android-chrome-*.png
Allow: /manifest.json
Allow: /browserconfig.xml

# Crawl-delay for courtesy
Crawl-delay: 1

# Host directive
Host: https://aldeyarksa.tech`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
