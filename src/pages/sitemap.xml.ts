import type { APIRoute } from 'astro';

const pages = [
  { url: '/', lastmod: '2025-07-02' },
  { url: '/dich-vu/', lastmod: '2025-07-02' },
  { url: '/du-an-da-hoan-thien/', lastmod: '2025-07-02' },
  { url: '/cam-nang/', lastmod: '2025-07-02' },
  { url: '/chia-se-kinh-nghiem/', lastmod: '2025-07-02' },
  { url: '/video-cong-trinh/', lastmod: '2025-07-02' },
  { url: '/gioi-thieu/', lastmod: '2025-07-02' },
  { url: '/gui-yeu-cau/', lastmod: '2025-07-02' },
];

export const GET: APIRoute = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  pages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>http:/localhost:4321${page.url}</loc>\n`; // Thay thế bằng domain của bạn
    sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>0.8</priority>\n`;
    sitemap += `  </url>\n`;
  }); 

  sitemap += `</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
