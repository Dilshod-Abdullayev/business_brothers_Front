"use client"

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeModal, setModalLoading } from '@/store/slices/modalSlice'
import { useTranslations } from 'next-intl'
import { m, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function Modal() {
  const dispatch = useAppDispatch()
  const modal = useAppSelector((state) => state.modal)
  const isOpen = modal?.isOpen || false
  const type = modal?.type || null
  const data = modal?.data || null
  const isLoading = modal?.isLoading || false
  const t = useTranslations('contact.form')

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setModalLoading(true))
    
    // Simulate API call
    setTimeout(() => {
      dispatch(setModalLoading(false))
      dispatch(closeModal())
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <m.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] mb-2">
                {t('title')}
              </h3>
              <p className="text-muted-foreground">
                {t('subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('name')}
                </label>
                <Input
                  type="text"
                  placeholder={t('name')}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('email')}
                </label>
                <Input
                  type="email"
                  placeholder={t('email')}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('phone')}
                </label>
                <Input
                  type="tel"
                  placeholder={t('phone')}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('message')}
                </label>
                <Textarea
                  placeholder={t('message')}
                  rows={4}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Yuborilmoqda...
                  </>
                ) : (
                  t('send')
                )}
              </Button>
            </form>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  )
}
