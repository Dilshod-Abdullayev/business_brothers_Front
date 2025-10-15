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
      title: "Business Brothers and Partners LLC | Fakhriddin Maksumov | Halol Biznes | Toshkent",
      description: "Business Brothers and Partners LLC - Fakhriddin Maksumov tomonidan asos solingan halol biznes kompaniyasi. $22 million FOOD BAZAR loyihasi, Milaf Cola import, premium restoranlar va halol turizm. Toshkent, O'zbekiston.",
      keywords: "Fakhriddin Maksumov, Business Brothers and Partners, Business Brothers Partners LLC, halol biznes, FOOD BAZAR, Milaf Cola, halol turizm, Toshkent, O'zbekiston, halol restoran, import kompaniya, halol mahsulotlar",
      siteName: "Business Brothers and Partners LLC",
    },
    ru: {
      title: "Business Brothers and Partners LLC | Фахриддин Максумов | Халяльный Бизнес | Ташкент",
      description: "Business Brothers and Partners LLC - компания халяльного бизнеса, основанная Фахриддином Максумовым. Проект FOOD BAZAR $22 млн, импорт Milaf Cola, премиум рестораны и халяльный туризм. Ташкент, Узбекистан.",
      keywords: "Фахриддин Максумов, Business Brothers and Partners, Business Brothers Partners LLC, халяльный бизнес, FOOD BAZAR, Milaf Cola, халяльный туризм, Ташкент, Узбекистан, халяльный ресторан, импорт компания, халяльные продукты",
      siteName: "Business Brothers and Partners LLC",
    },
    en: {
      title: "Business Brothers and Partners LLC | Fakhriddin Maksumov | Halal Business | Tashkent",
      description: "Business Brothers and Partners LLC - halal business company founded by Fakhriddin Maksumov. $22 million FOOD BAZAR project, Milaf Cola import, premium restaurants and halal tourism. Tashkent, Uzbekistan.",
      keywords: "Fakhriddin Maksumov, Business Brothers and Partners, Business Brothers Partners LLC, halal business, FOOD BAZAR, Milaf Cola, halal tourism, Tashkent, Uzbekistan, halal restaurant, import company, halal products",
      siteName: "Business Brothers and Partners LLC",
    },
    ar: {
      title: "Business Brothers and Partners LLC | فخريدين مكسوموف | الأعمال الحلال | طشقند",
      description: "Business Brothers and Partners LLC - شركة الأعمال الحلال التي أسسها فخريدين مكسوموف. مشروع FOOD BAZAR بقيمة 22 مليون دولار، استيراد Milaf Cola، مطاعم مميزة وسياحة حلال. طشقند، أوزبكستان.",
      keywords: "فخريدين مكسوموف, Business Brothers and Partners, Business Brothers Partners LLC, الأعمال الحلال, FOOD BAZAR, Milaf Cola, السياحة الحلال, طشقند, أوزبكستان, مطعم حلال, شركة استيراد, منتجات حلال",
      siteName: "Business Brothers and Partners LLC",
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
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
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
    "name": "Business Brothers and Partners LLC",
    "legalName": "Business Brothers and Partners LLC",
    "url": "https://businessbrothers.uz",
    "logo": "https://businessbrothers.uz/logo.png",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Fakhriddin Maksumov",
      "jobTitle": "Founder & CEO",
      "description": "15 years of industry experience. Expert in restaurant management and international trade."
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tashkent",
      "addressCountry": "UZ"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998-71-123-45-67",
      "contactType": "Customer Service",
      "areaServed": "UZ",
      "availableLanguage": ["uz", "ru", "en", "ar"]
    },
    "sameAs": [
      "https://www.facebook.com/businessbrothers",
      "https://www.instagram.com/businessbrothers",
      "https://www.linkedin.com/company/businessbrothers",
      "https://twitter.com/businessbrothers"
    ],
    "description": "Business Brothers and Partners LLC - halal business company founded by Fakhriddin Maksumov. $22 million FOOD BAZAR project, Milaf Cola import, premium restaurants and halal tourism.",
    "keywords": "Fakhriddin Maksumov, Business Brothers and Partners, halal business, FOOD BAZAR, Milaf Cola, halal tourism, Tashkent, Uzbekistan"
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Business Brothers and Partners LLC",
    "image": "https://businessbrothers.uz/logo.png",
    "@id": "https://businessbrothers.uz",
    "url": "https://businessbrothers.uz",
    "telephone": "+998-71-123-45-67",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tashkent",
      "addressLocality": "Tashkent",
      "addressCountry": "UZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.2995,
      "longitude": 69.2401
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Fakhriddin Maksumov",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Business Brothers and Partners LLC"
    },
    "description": "15 years of industry experience. Expert in restaurant management and international trade. Founder of Business Brothers and Partners LLC.",
    "url": "https://businessbrothers.uz",
    "sameAs": [
      "https://www.linkedin.com/in/fakhriddin-maksumov"
    ]
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
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
