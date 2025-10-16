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
      changeFrequency: 'daily',
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
    
    // About section
    sitemapEntries.push({
      url: `${baseUrl}/${locale}#haqimizda`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
    
    // Services section
    sitemapEntries.push({
      url: `${baseUrl}/${locale}#xizmatlar`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
    
    // Projects section
    sitemapEntries.push({
      url: `${baseUrl}/${locale}#loyihalar`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
    
    // Contact section
    sitemapEntries.push({
      url: `${baseUrl}/${locale}#aloqa`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return sitemapEntries
}

