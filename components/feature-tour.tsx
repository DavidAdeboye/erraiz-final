"use client"

import { useState, useEffect, useRef } from "react"
import { X, ArrowRight } from "lucide-react"

interface TourStep {
  element: string
  title: string
  description: string
  position: "top" | "right" | "bottom" | "left"
}

export default function FeatureTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  const tourSteps: TourStep[] = [
    {
      element: ".nav-link[href='/categories/plastic-made-products']",
      title: "Browse Categories",
      description: "Explore our sustainable product categories",
      position: "bottom",
    },
    {
      element: "form[class*='relative']",
      title: "Search Products",
      description: "Find exactly what you're looking for",
      position: "bottom",
    },
    {
      element: ".nav-link[href='/cart']",
      title: "Your Cart",
      description: "View your selected items here",
      position: "bottom",
    },
    {
      element: ".nav-link[href='/account']",
      title: "Account Settings",
      description: "Manage your profile and preferences",
      position: "bottom",
    },
  ]

  useEffect(() => {
    // Check if user has completed the initial onboarding
    const onboardingSeen = localStorage.getItem("onboardingSeen")
    const tourSeen = localStorage.getItem("featureTourSeen")

    if (onboardingSeen && !tourSeen) {
      // Start feature tour after a delay
      const timer = setTimeout(() => {
        setIsActive(true)
        positionTooltip()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      positionTooltip()

      // Add highlight to current element
      const targetElement = document.querySelector(tourSteps[currentStep].element)
      if (targetElement) {
        targetElement.classList.add("tour-highlight")
      }

      return () => {
        // Remove highlight when component unmounts or step changes
        const targetElement = document.querySelector(tourSteps[currentStep].element)
        if (targetElement) {
          targetElement.classList.remove("tour-highlight")
        }
      }
    }
  }, [currentStep, isActive])

  const positionTooltip = () => {
    const targetElement = document.querySelector(tourSteps[currentStep].element)
    if (!targetElement || !tooltipRef.current) return

    const targetRect = targetElement.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const position = tourSteps[currentStep].position

    let top = 0
    let left = 0

    switch (position) {
      case "top":
        top = targetRect.top - tooltipRect.height - 10
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case "right":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.right + 10
        break
      case "bottom":
        top = targetRect.bottom + 10
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case "left":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.left - tooltipRect.width - 10
        break
    }

    // Adjust if tooltip would go off screen
    if (left < 10) left = 10
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10
    }

    setTooltipPosition({ top, left })
  }

  const handleNext = () => {
    // Remove highlight from current element
    const targetElement = document.querySelector(tourSteps[currentStep].element)
    if (targetElement) {
      targetElement.classList.remove("tour-highlight")
    }

    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTour()
    }
  }

  const completeTour = () => {
    localStorage.setItem("featureTourSeen", "true")
    setIsActive(false)
  }

  const skipTour = () => {
    // Remove highlight from current element
    const targetElement = document.querySelector(tourSteps[currentStep].element)
    if (targetElement) {
      targetElement.classList.remove("tour-highlight")
    }

    localStorage.setItem("featureTourSeen", "true")
    setIsActive(false)
  }

  if (!isActive) {
    return null
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 pointer-events-none" />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 w-64 bg-white rounded-lg shadow-lg p-4"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
        }}
      >
        <button
          onClick={skipTour}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close tour"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="font-bold text-gray-900 mb-1">{tourSteps[currentStep].title}</h3>
        <p className="text-gray-600 text-sm mb-4">{tourSteps[currentStep].description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {currentStep + 1} of {tourSteps.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            {currentStep < tourSteps.length - 1 ? "Next" : "Finish"}
            <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>
    </>
  )
}
