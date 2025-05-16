import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import CategoryNav from "@/components/category-nav"

export default function CartPage() {
  const cartItems = [
    {
      id: "product-1",
      name: "Recycled Plastic Container",
      price: 24.99,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: "product-2",
      name: "Glass Vase",
      price: 34.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 4.99
  const total = subtotal + shipping

  return (
    <div className="flex flex-col min-h-screen">
      <CategoryNav />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <h3 className="font-medium">Product</h3>
                      </div>
                      <div className="col-span-2 text-center">
                        <h3 className="font-medium">Price</h3>
                      </div>
                      <div className="col-span-2 text-center">
                        <h3 className="font-medium">Quantity</h3>
                      </div>
                      <div className="col-span-2 text-right">
                        <h3 className="font-medium">Total</h3>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-6">
                            <div className="flex items-center gap-4">
                              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <button className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                  <Trash2 className="h-3 w-3" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
                          <div className="col-span-2">
                            <div className="flex items-center justify-center">
                              <button className="w-8 h-8 flex items-center justify-center border rounded-l-md">
                                <Minus className="h-3 w-3" />
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                className="w-10 h-8 text-center border-t border-b"
                              />
                              <button className="w-8 h-8 flex items-center justify-center border rounded-r-md">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          <div className="col-span-2 text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Link href="/shop" className="flex items-center gap-2 text-green-600 hover:underline">
                    ← Continue Shopping
                  </Link>
                  <button className="text-sm text-gray-600 border px-4 py-2 rounded-md">Update Cart</button>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="border rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
                    Proceed to Checkout
                  </button>

                  <div className="mt-6">
                    <div className="text-sm text-gray-600 mb-2">Promo Code</div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 border rounded-l-md px-3 py-2 text-sm"
                      />
                      <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md text-sm">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/shop" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
