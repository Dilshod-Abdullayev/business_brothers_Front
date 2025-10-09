import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['uz', 'ru', 'en', 'ar'];

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically, you would get the locale from the URL or cookies
  let locale = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    locale = 'uz'; // default locale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
