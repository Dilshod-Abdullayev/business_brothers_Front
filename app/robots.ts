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
      'https://businessbrothers.uz/sitemap.xml',
      'https://businessbrothers.uz/uz/sitemap.xml',
      'https://businessbrothers.uz/ru/sitemap.xml',
      'https://businessbrothers.uz/en/sitemap.xml',
      'https://businessbrothers.uz/ar/sitemap.xml',
    ],
    host: 'https://businessbrothers.uz',
  }
}

