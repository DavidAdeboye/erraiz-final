import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, MapPin, Package, Printer, ShoppingBag, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutConfirmationPage() {
  // This will redirect to login if not authenticated
  requireAuth()

  // Mock order data
  const order = {
    id: "ORD-12345",
    date: "May 15, 2025",
    status: "Processing",
    paymentMethod: "Credit Card (•••• 4242)",
    shippingMethod: "Standard Shipping",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "San Francisco",
      state: "CA",
      postalCode: "94103",
      country: "United States",
      phone: "(123) 456-7890",
    },
    items: [
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
    ],
    subtotal: 84.97,
    shipping: 4.99,
    tax: 6.8,
    total: 96.76,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Order #{order.id}</h2>
              <p className="text-sm text-gray-500">Placed on {order.date}</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                Print Receipt
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Package className="h-4 w-4 mr-1 text-gray-500" />
                Order Status
              </h3>
              <div className="text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <ShoppingBag className="h-4 w-4 mr-1 text-gray-500" />
                Payment Method
              </h3>
              <div className="text-sm text-gray-600">{order.paymentMethod}</div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Truck className="h-4 w-4 mr-1 text-gray-500" />
                Shipping Method
              </h3>
              <div className="text-sm text-gray-600">{order.shippingMethod}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                Shipping Address
              </h3>
              <div className="text-sm text-gray-600">
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
                <br />
                {order.shippingAddress.phone}
              </div>
            </div>
          </div>

          <h3 className="text-sm font-medium mb-4">Order Items</h3>
          <div className="border rounded-md overflow-hidden mb-6">
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`} className="font-medium hover:text-green-600">
                      {item.name}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">Seller: {item.seller}</div>
                    <div className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-full md:w-64">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-medium text-base">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/account/orders">
            <Button variant="outline" className="w-full md:w-auto">
              View All Orders
            </Button>
          </Link>
          <Link href="/shop">
            <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
