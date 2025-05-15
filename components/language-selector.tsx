"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface LanguageSelectorProps {
  onClose: () => void
}

export default function LanguageSelector({ onClose }: LanguageSelectorProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "US", name: "United States (USD)", flag: "/flags/us.svg" },
    { code: "NG", name: "Nigeria (NGN)", flag: "/flags/ng.svg" },
    { code: "GB", name: "United Kingdom (GBP)", flag: "/flags/gb.svg" },
    { code: "CA", name: "Canada (CAD)", flag: "/flags/ca.svg" },
    { code: "AU", name: "Australia (AUD)", flag: "/flags/au.svg" },
    { code: "DE", name: "Germany (EUR)", flag: "/flags/de.svg" },
    { code: "FR", name: "France (EUR)", flag: "/flags/fr.svg" },
    { code: "JP", name: "Japan (JPY)", flag: "/flags/jp.svg" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-30">
      <div ref={modalRef} className="bg-white shadow-lg mt-16 mr-4 rounded-md w-64 overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              className="flex items-center w-full px-4 py-3 hover:bg-gray-50 text-left"
              onClick={() => onClose()}
            >
              <Image
                src={language.flag || "/placeholder.svg"}
                alt={language.code}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full mr-3"
              />
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
