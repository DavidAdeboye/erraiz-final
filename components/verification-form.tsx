"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function VerificationForm() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (value && !/^\d+$/.test(value)) {
      return
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleResend = () => {
    if (timer === 0) {
      setIsResending(true)

      // Simulate API call
      setTimeout(() => {
        setIsResending(false)
        setTimer(60)
      }, 1000)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const verificationCode = code.join("")
    if (verificationCode.length === 4) {
      // Verify code
      router.push("/")
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Check your email</h1>
      <p className="text-gray-600 mb-6">
        We've sent a verification code to your email address. Enter the code below to verify your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="code-0" className="block text-sm font-medium text-gray-700 mb-2">
            Verification code
          </label>
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="input-field w-14 h-14 text-center text-xl"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">
          Verify my email
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Didn't receive a code?{" "}
          <button
            type="button"
            className={`text-green-600 ${timer > 0 || isResending ? "opacity-50 cursor-not-allowed" : "hover:text-green-500"}`}
            disabled={timer > 0 || isResending}
            onClick={handleResend}
          >
            {isResending ? "Resending..." : timer > 0 ? `Resend code (${timer}s)` : "Resend code"}
          </button>
        </p>
      </div>
    </div>
  )
}
