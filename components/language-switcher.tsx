"use client"

import { useState } from "react"
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Languages, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setLanguage } from '@/store/slices/languageSlice'

const languages = [
  { code: 'uz', name: 'Oʻzbekcha', flag: '🇺🇿', nativeName: "O'zbek" },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: "Русский" },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: "English" },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: "العربية" },
]

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations()
  const language = useAppSelector((state) => state.language)
  const currentLanguage = language?.availableLanguages?.find((lang: any) => lang.code === locale) || languages.find(l => l.code === locale) || languages[0]
  const availableLanguages = language?.availableLanguages || languages

  const handleLanguageChange = (newLocale: string) => {
    dispatch(setLanguage(newLocale))
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors relative group"
        >
          <Languages className="w-4 h-4 group-hover:text-primary transition-colors" />
          <span className="text-2xl leading-none" style={{ fontFamily: 'system-ui' }}>
            {currentLanguage.flag}
          </span>
          <span className="hidden md:inline text-sm font-medium">
            {currentLanguage.nativeName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-[#1f2937] border-gray-700 shadow-2xl shadow-primary/10"
      >
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Tilni tanlang
        </div>
        {availableLanguages.map((language: any) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-lg transition-all ${
              language.code === locale 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-primary/5 text-foreground'
            }`}
          >
            <span 
              className="text-2xl leading-none" 
              style={{ fontFamily: 'system-ui' }}
            >
              {language.flag}
            </span>
            <div className="flex-1">
              <div className="font-medium">{language.nativeName}</div>
              <div className="text-xs text-muted-foreground">{language.name}</div>
            </div>
            {language.code === locale && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
