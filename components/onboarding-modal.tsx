"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface OnboardingStep {
  title: string
  description: string
  image: string
  ctaText: string
}

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const router = useRouter()

  const onboardingSteps: OnboardingStep[] = [
    {
      title: "Welcome to ERaiiz",
      description:
        "Discover sustainable products made from recycled materials. Shop eco-friendly and make a difference.",
      image: "/onboarding/welcome.png",
      ctaText: "Next",
    },
    {
      title: "Browse Categories",
      description: "Explore our wide range of sustainable products across different categories.",
      image: "/onboarding/categories.png",
      ctaText: "Next",
    },
    {
      title: "Add to Cart",
      description: "Found something you like? Add it to your cart with a single click.",
      image: "/onboarding/cart.png",
      ctaText: "Next",
    },
    {
      title: "Checkout Securely",
      description: "Complete your purchase with our secure and easy checkout process.",
      image: "/onboarding/checkout.png",
      ctaText: "Get Started",
    },
  ]

  useEffect(() => {
    // Check if user has seen onboarding
    const onboardingSeen = localStorage.getItem("onboardingSeen")

    if (!onboardingSeen) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setHasSeenOnboarding(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const completeOnboarding = () => {
    localStorage.setItem("onboardingSeen", "true")
    setHasSeenOnboarding(true)
    setIsOpen(false)

    // Redirect to homepage or relevant page
    router.push("/")
  }

  const skipOnboarding = () => {
    localStorage.setItem("onboardingSeen", "true")
    setHasSeenOnboarding(true)
    setIsOpen(false)
  }

  if (!isOpen || hasSeenOnboarding) {
    return null
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        <button
          onClick={skipOnboarding}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close onboarding"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-green-50 p-6 flex items-center justify-center">
            <Image
              src={currentStepData.image || "/placeholder.svg"}
              alt={currentStepData.title}
              width={240}
              height={240}
              className="object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentStepData.title}</h2>
            <p className="text-gray-600 mb-8">{currentStepData.description}</p>

            {/* Progress Indicators */}
            <div className="flex space-x-2 mb-8">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full ${index === currentStep ? "w-8 bg-green-600" : "w-2 bg-gray-300"}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button onClick={skipOnboarding} className="text-gray-500 hover:text-gray-700 text-sm">
                Skip
              </button>

              <button
                onClick={handleNext}
                className="flex items-center justify-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {currentStepData.ctaText}
                {currentStep < onboardingSteps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                {currentStep === onboardingSteps.length - 1 && <Check className="ml-2 h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
