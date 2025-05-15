"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const [steps, setSteps] = useState([
    { id: 1, name: "Cart review", status: "current" },
    { id: 2, name: "Billing address", status: "upcoming" },
    { id: 3, name: "Payment", status: "upcoming" },
  ])

  useEffect(() => {
    const updatedSteps = steps.map((step) => {
      if (step.id < currentStep) {
        return { ...step, status: "complete" }
      } else if (step.id === currentStep) {
        return { ...step, status: "current" }
      } else {
        return { ...step, status: "upcoming" }
      }
    })

    setSteps(updatedSteps)
  }, [currentStep])

  return (
    <div className="py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, stepIdx) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center relative`}>
              {step.status === "complete" ? (
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
              ) : step.status === "current" ? (
                <div className="h-8 w-8 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">{step.id}</span>
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-500">{step.id}</span>
                </div>
              )}

              <div className="ml-4 hidden md:block">
                <p
                  className={`text-sm font-medium ${
                    step.status === "complete"
                      ? "text-green-600"
                      : step.status === "current"
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {step.name}
                </p>
              </div>
            </div>

            {stepIdx < steps.length - 1 && (
              <div
                className={`w-16 md:w-24 h-0.5 mx-2 ${
                  steps[stepIdx + 1].status === "complete" || steps[stepIdx].status === "complete"
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
