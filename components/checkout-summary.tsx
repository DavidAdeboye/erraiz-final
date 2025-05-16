import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutSummary() {
  // Mock cart items
  const cartItems = [
    {
      id: "product-1",
      name: "Recycled Plastic Container",
      price: 24.99,
      quantity: 2,
      image: "/placeholder.svg",
      seller: "Eco Solutions",
    },
    {
      id: "product-2",
      name: "Glass Vase",
      price: 34.99,
      quantity: 1,
      image: "/placeholder.svg",
      seller: "Green Living",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 4.99
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/product/${item.id}`} className="text-sm font-medium hover:text-green-600 line-clamp-2">
                {item.name}
              </Link>
              <div className="text-xs text-gray-500 mt-1">Seller: {item.seller}</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm">
                  ${item.price.toFixed(2)} × {item.quantity}
                </div>
                <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="text-sm text-gray-600 mb-2">Have a promo code?</div>
        <div className="flex">
          <Input placeholder="Enter code" className="rounded-r-none" />
          <Button variant="outline" className="rounded-l-none border-l-0">
            Apply
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t font-medium text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  )
}
