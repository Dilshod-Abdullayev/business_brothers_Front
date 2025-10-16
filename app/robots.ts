import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: [
      'https://www.bbp.co.uz/sitemap.xml',
      'https://www.bbp.co.uz/uz/sitemap.xml',
      'https://www.bbp.co.uz/ru/sitemap.xml',
      'https://www.bbp.co.uz/en/sitemap.xml',
      'https://www.bbp.co.uz/ar/sitemap.xml',
    ],
    host: 'https://www.bbp.co.uz',
  }
}

