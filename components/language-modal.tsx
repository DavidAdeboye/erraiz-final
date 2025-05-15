"use client"

import { useEffect, useRef } from "react"

interface LanguageModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const languages = [
    { code: "US", name: "United States (USD)", flag: "🇺🇸" },
    { code: "NG", name: "Nigeria (NGN)", flag: "🇳🇬" },
    { code: "GB", name: "United Kingdom (GBP)", flag: "🇬🇧" },
    { code: "CA", name: "Canada (CAD)", flag: "🇨🇦" },
    { code: "AU", name: "Australia (AUD)", flag: "🇦🇺" },
    { code: "DE", name: "Germany (EUR)", flag: "🇩🇪" },
    { code: "FR", name: "France (EUR)", flag: "🇫🇷" },
    { code: "JP", name: "Japan (JPY)", flag: "🇯🇵" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Select Language and Currency</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {languages.map((language) => (
              <button
                key={language.code}
                className="flex items-center w-full p-3 hover:bg-gray-50 rounded-md"
                onClick={() => {
                  // Set language logic would go here
                  onClose()
                }}
              >
                <span className="text-xl mr-3">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
