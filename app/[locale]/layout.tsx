import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "@/app/globals.css"
import { Suspense } from "react"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Providers } from "@/components/providers"
import { Modal } from "@/components/modal"
import { MotionProvider } from "@/components/motion-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Removed unused weights: 300, 500
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
})

const locales = ['uz', 'ru', 'en', 'ar'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const metaContent = {
    uz: {
      title: "Business Brothers Partners LLC | Fakhriddin Maksumov | Halol Biznes Toshkent O'zbekiston",
      description: "Business Brothers Partners LLC (BusinessBrothersPartners) - Fakhriddin Maksumov tomonidan asos solingan O'zbekistondagi eng yirik halol biznes kompaniyasi. $22 million FOOD BAZAR loyihasi, Milaf Cola import, premium restoranlar, halol turizm va qurilish. Toshkent, O'zbekiston. Nest one C block.",
      keywords: "Business Brothers Partners, BusinessBrothersPartners, Business Brothers Partners LLC, BusinessBrothersPartners LLC, Fakhriddin Maksumov, halol biznes, halol biznes Toshkent, halol biznes O'zbekiston, FOOD BAZAR, Milaf Cola, halol turizm, halol restoran, import kompaniya, halol mahsulotlar, qurilish kompaniyasi, Nest one C block, Shayxontohur, Toshkent biznes, O'zbekiston kompaniya, halol sertifikat, premium biznes, investitsiya, hamkorlik, franchise",
      siteName: "Business Brothers Partners LLC - Halol Biznes Toshkent",
    },
    ru: {
      title: "Business Brothers Partners LLC | Фахриддин Максумов | Халяльный Бизнес Ташкент Узбекистан",
      description: "Business Brothers Partners LLC (BusinessBrothersPartners) - крупнейшая компания халяльного бизнеса в Узбекистане, основанная Фахриддином Максумовым. Проект FOOD BAZAR $22 млн, импорт Milaf Cola, премиум рестораны, халяльный туризм и строительство. Ташкент, Узбекистан. Nest one C block.",
      keywords: "Business Brothers Partners, BusinessBrothersPartners, Business Brothers Partners LLC, BusinessBrothersPartners LLC, Фахриддин Максумов, халяльный бизнес, халяльный бизнес Ташкент, халяльный бизнес Узбекистан, FOOD BAZAR, Milaf Cola, халяльный туризм, халяльный ресторан, импорт компания, халяльные продукты, строительная компания, Nest one C block, Шайхантахур, Ташкент бизнес, Узбекистан компания, халяль сертификат, премиум бизнес, инвестиции, партнерство, франшиза",
      siteName: "Business Brothers Partners LLC - Халяльный Бизнес Ташкент",
    },
    en: {
      title: "Business Brothers Partners LLC | Fakhriddin Maksumov | Halal Business Tashkent Uzbekistan",
      description: "Business Brothers Partners LLC (BusinessBrothersPartners) - the largest halal business company in Uzbekistan founded by Fakhriddin Maksumov. $22 million FOOD BAZAR project, Milaf Cola import, premium restaurants, halal tourism and construction. Tashkent, Uzbekistan. Nest one C block.",
      keywords: "Business Brothers Partners, BusinessBrothersPartners, Business Brothers Partners LLC, BusinessBrothersPartners LLC, Fakhriddin Maksumov, halal business, halal business Tashkent, halal business Uzbekistan, FOOD BAZAR, Milaf Cola, halal tourism, halal restaurant, import company, halal products, construction company, Nest one C block, Shayxontohur, Tashkent business, Uzbekistan company, halal certificate, premium business, investment, partnership, franchise",
      siteName: "Business Brothers Partners LLC - Halal Business Tashkent",
    },
    ar: {
      title: "Business Brothers Partners LLC | فخريدين مكسوموف | الأعمال الحلال طشقند أوزبكستان",
      description: "Business Brothers Partners LLC (BusinessBrothersPartners) - أكبر شركة أعمال حلال في أوزبكستان أسسها فخريدين مكسوموف. مشروع FOOD BAZAR بقيمة 22 مليون دولار، استيراد Milaf Cola، مطاعم مميزة، سياحة حلال وبناء. طشقند، أوزبكستان. Nest one C block.",
      keywords: "Business Brothers Partners, BusinessBrothersPartners, Business Brothers Partners LLC, BusinessBrothersPartners LLC, فخريدين مكسوموف, الأعمال الحلال, الأعمال الحلال طشقند, الأعمال الحلال أوزبكستان, FOOD BAZAR, Milaf Cola, السياحة الحلال, مطعم حلال, شركة استيراد, منتجات حلال, شركة بناء, Nest one C block, شيخانتهور, طشقند الأعمال, أوزبكستان شركة, شهادة حلال, الأعمال المميزة, استثمار, شراكة, امتياز",
      siteName: "Business Brothers Partners LLC - الأعمال الحلال طشقند",
    },
  };

  const content = metaContent[locale as keyof typeof metaContent] || metaContent.uz;

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    authors: [{ name: "Fakhriddin Maksumov" }, { name: "Business Brothers and Partners LLC" }],
    creator: "Business Brothers and Partners LLC",
    publisher: "Business Brothers and Partners LLC",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://businessbrothers.uz'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'uz': '/uz',
        'ru': '/ru',
        'en': '/en',
        'ar': '/ar',
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `https://businessbrothers.uz/${locale}`,
      siteName: content.siteName,
      locale: locale,
      type: 'website',
      images: [
        {
          url: 'https://businessbrothers.uz/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Business Brothers and Partners LLC - Fakhriddin Maksumov',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: ['https://businessbrothers.uz/og-image.jpg'],
      creator: '@businessbrothers',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/images/logotip-64x64.png', sizes: '64x64', type: 'image/png' },
        { url: '/images/logotip-512x512.png', sizes: '512x512', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' }
      ],
      shortcut: '/images/logotip-64x64.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  const messages = await getMessages({ locale });

  // Structured Data for SEO (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Business Brothers Partners LLC",
    "alternateName": ["Business Brothers Partners", "BusinessBrothersPartners", "BBP LLC"],
    "legalName": "Business Brothers Partners LLC",
    "url": "https://businessbrothers.uz",
    "logo": "https://businessbrothers.uz/images/logotip-512x512.png",
    "image": "https://businessbrothers.uz/og-image.jpg",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Fakhriddin Maksumov",
      "jobTitle": "Founder & CEO",
      "description": "15 years of industry experience. Expert in restaurant management, international trade and halal business development."
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nest one C block 2nd floor, Shayxontohur district",
      "addressLocality": "Tashkent",
      "addressRegion": "Tashkent",
      "addressCountry": "UZ",
      "postalCode": "100000"
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+998-93-398-50-50",
      "contactType": "Customer Service",
      "areaServed": ["UZ", "RU", "KZ", "TJ", "KG"],
      "availableLanguage": ["uz", "ru", "en", "ar"]
    }, {
      "@type": "ContactPoint",
      "email": "businessbrotherspartners@gmail.com",
      "contactType": "Customer Support"
    }],
    "sameAs": [
      "https://www.facebook.com/businessbrothers",
      "https://www.instagram.com/businessbrothers",
      "https://www.linkedin.com/company/businessbrothers",
      "https://twitter.com/businessbrothers",
      "https://t.me/businessbrothers"
    ],
    "description": "Business Brothers Partners LLC - крупнейшая компания халяльного бизнеса в Узбекистане, основанная Фахриддином Максумовым. Проект FOOD BAZAR $22 млн, импорт Milaf Cola, премиум рестораны, халяльный туризм и строительство.",
    "keywords": "Business Brothers Partners, BusinessBrothersPartners, Fakhriddin Maksumov, halal business, FOOD BAZAR, Milaf Cola, halal tourism, construction, Tashkent, Uzbekistan",
    "slogan": "Halal Business Excellence in Central Asia",
    "brand": {
      "@type": "Brand",
      "name": "Business Brothers Partners"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "FOOD BAZAR - Halal Supermarket",
            "description": "$22 million halal supermarket project"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Milaf Cola Import",
            "description": "Premium beverage import services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Halal Tourism",
            "description": "Premium halal tourism services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Construction Services",
            "description": "Premium construction and development"
          }
        }
      ]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Business Brothers Partners LLC",
    "alternateName": "Business Brothers Partners",
    "image": ["https://businessbrothers.uz/images/logotip-512x512.png", "https://businessbrothers.uz/og-image.jpg"],
    "@id": "https://businessbrothers.uz",
    "url": "https://businessbrothers.uz",
    "telephone": "+998-93-398-50-50",
    "email": "businessbrotherspartners@gmail.com",
    "priceRange": "$$$$",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "UZS, USD",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nest one C block 2nd floor, Shayxontohur district",
      "addressLocality": "Tashkent",
      "addressRegion": "Tashkent",
      "addressCountry": "UZ",
      "postalCode": "100000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.307941,
      "longitude": 69.237445
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5"
    },
    "hasMap": "https://maps.google.com/maps?q=41.307941,69.237445&ll=41.307941,69.237445&z=16"
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Fakhriddin Maksumov",
    "alternateName": ["Фахриддин Максумов", "فخريدين مكسوموف"],
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Business Brothers Partners LLC",
      "url": "https://businessbrothers.uz"
    },
    "description": "15 years of industry experience. Expert in restaurant management, international trade and halal business development. Founder of Business Brothers Partners LLC, leading halal business company in Uzbekistan.",
    "url": "https://businessbrothers.uz",
    "image": "https://businessbrothers.uz/fakhriddin-maksumov.jpg",
    "knowsAbout": ["Halal Business", "Restaurant Management", "International Trade", "Business Development", "Import Export"],
    "sameAs": [
      "https://www.linkedin.com/in/fakhriddin-maksumov",
      "https://www.facebook.com/fakhriddin.maksumov",
      "https://www.instagram.com/fakhriddin.maksumov"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `https://businessbrothers.uz/${locale}`
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "About Us",
      "item": `https://businessbrothers.uz/${locale}#haqimizda`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": "Services",
      "item": `https://businessbrothers.uz/${locale}#xizmatlar`
    }, {
      "@type": "ListItem",
      "position": 4,
      "name": "Projects",
      "item": `https://businessbrothers.uz/${locale}#loyihalar`
    }, {
      "@type": "ListItem",
      "position": 5,
      "name": "Contact",
      "item": `https://businessbrothers.uz/${locale}#aloqa`
    }]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Business Brothers Partners LLC",
    "alternateName": ["Business Brothers Partners", "BusinessBrothersPartners", "BBP LLC"],
    "url": "https://businessbrothers.uz",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://businessbrothers.uz/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["uz", "ru", "en", "ar"]
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Critical CSS for hero section */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .hero-section {
              min-height: 100vh;
              background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%);
            }
            .hero-bg {
              position: absolute;
              inset: 0;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }
          `
        }} />
        <link rel="preload" href="/images/samarkand.jpg" as="image" type="image/jpeg" fetchPriority="high" />
        <link rel="preload" href="/images/samarkand2.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/iskandar-kambaraliyev-U6UuPXyyINo-unsplash.jpg" as="image" type="image/jpeg" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="geo.region" content="UZ-TK" />
        <meta name="geo.placename" content="Tashkent" />
        <meta name="geo.position" content="41.307941;69.237445" />
        <meta name="ICBM" content="41.307941, 69.237445" />
        
        {/* Multilingual support */}
        <link rel="alternate" hrefLang="uz" href="https://businessbrothers.uz/uz" />
        <link rel="alternate" hrefLang="ru" href="https://businessbrothers.uz/ru" />
        <link rel="alternate" hrefLang="en" href="https://businessbrothers.uz/en" />
        <link rel="alternate" hrefLang="ar" href="https://businessbrothers.uz/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://businessbrothers.uz/en" />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <MotionProvider>
                <Navigation />
                <Suspense fallback={null}>{children}</Suspense>
                <Footer />
                <Modal />
                <Analytics />
              </MotionProvider>
            </ThemeProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
