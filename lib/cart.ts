"use client"

import { useState, useEffect } from "react"
import type { CartItem, Product } from "@/types"

// Helper function to get cart from localStorage
const getStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") return []

  const storedCart = localStorage.getItem("cart")
  return storedCart ? JSON.parse(storedCart) : []
}

// Helper function to save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window === "undefined") return

  localStorage.setItem("cart", JSON.stringify(cart))
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    setCart(getStoredCart())
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(cart)
    }
  }, [cart, isLoaded])

  // Add item to cart
  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color,
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        // Add new item to cart
        return [
          ...prevCart,
          {
            id: `${product.id}-${size || "default"}-${color || "default"}-${Date.now()}`,
            product,
            quantity,
            size,
            color,
          },
        ]
      }
    })
  }

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Calculate cart totals
  const getCartTotals = () => {
    return cart.reduce(
      (totals, item) => {
        const itemTotal = item.product.price * item.quantity
        return {
          subtotal: totals.subtotal + itemTotal,
          itemCount: totals.itemCount + item.quantity,
        }
      },
      { subtotal: 0, itemCount: 0 },
    )
  }

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    isLoaded,
  }
}
