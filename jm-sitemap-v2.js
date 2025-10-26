import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrige __dirname no modo ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const baseUrl = 'https://www.dcontroll.com.br';
const siteFolder = './';
const outputFile = path.join(siteFolder, 'sitemap.xml');

// Função para buscar arquivos HTML
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

// Gera URLs
const htmlFiles = getHtmlFiles(siteFolder);
const urls = htmlFiles.map(file => {
  const relativePath = path.relative(siteFolder, file).replace(/\\/g, '/');
  return `${baseUrl}/${relativePath}`;
});

// Gera XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync(outputFile, xml, 'utf8');
console.log(`Sitemap criado com ${urls.length} URLs em ${outputFile}`);
