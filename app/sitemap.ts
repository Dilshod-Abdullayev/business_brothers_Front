import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://businessbrothers.uz'
  const locales = ['uz', 'ru', 'en', 'ar']
  const currentDate = new Date()

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Home page for each locale
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          uz: `${baseUrl}/uz`,
          ru: `${baseUrl}/ru`,
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
        },
      },
    })
  })

  return sitemapEntries
}

