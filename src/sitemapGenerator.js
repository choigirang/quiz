const fs = require('fs');
const prettier = require('prettier');

const SitemapGeneratedDate = new Date().toISOString().slice(0, 10);
const DOMAIN = 'https://www.dev-quiz.store/';

const formatting = async (target) => {
  return await prettier.format(target, { parser: 'html' });
};

let pages = ['', 'quiz', 'all', 'chart'];

const category = ['html', 'css', 'js', 'ts', 'react', 'next', 'cs'];

category.forEach((stack) => {
  pages.push(`quiz/${stack}`);
  pages.push(`all/${stack}`);
});

pages = pages.map((page) => DOMAIN + page);

const pageSitemap = pages
  .map(
    (page) => `
      <url>
        <loc>${page}</loc>
        <lastmod>${SitemapGeneratedDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page === 'https://www.dev-quiz.store/' ? 1 : 0.8}</priority>
      </url>
    `
  )
  .join('');

const generateSitemap = async () => {
  const rawSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pageSitemap}
    </urlset>`;

  const formattedSitemap = await formatting(rawSitemap);
  fs.writeFileSync('./public/sitemap.xml', formattedSitemap, 'utf8');
};

generateSitemap().catch(console.error);
