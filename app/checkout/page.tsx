import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, MapPin, ShieldCheck, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CheckoutSummary from "@/components/checkout-summary"

export default function CheckoutPage() {
  // This will redirect to login if not authenticated
  requireAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Link href="/cart" className="hover:text-green-600">
            Cart
          </Link>
          <span className="mx-2">→</span>
          <span className="font-medium text-gray-900">Checkout</span>
          <span className="mx-2">→</span>
          <span>Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Shipping Address
              </h2>
              <Button variant="outline" size="sm">
                Add New Address
              </Button>
            </div>

            <RadioGroup defaultValue="address-1" className="space-y-4">
              <div className="flex items-center space-x-2 border rounded-md p-4 relative">
                <RadioGroupItem value="address-1" id="address-1" />
                <Label htmlFor="address-1" className="flex-1 cursor-pointer">
                  <div className="font-medium">Home</div>
                  <div className="text-sm text-gray-500">
                    John Doe
                    <br />
                    123 Main St, Apt 4B
                    <br />
                    San Francisco, CA 94103
                    <br />
                    United States
                    <br />
                    (123) 456-7890
                  </div>
                </Label>
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Default</div>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="address-2" id="address-2" />
                <Label htmlFor="address-2" className="flex-1 cursor-pointer">
                  <div className="font-medium">Work</div>
                  <div className="text-sm text-gray-500">
                    John Doe
                    <br />
                    456 Market St, Floor 3
                    <br />
                    San Francisco, CA 94105
                    <br />
                    United States
                    <br />
                    (123) 456-7890
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Shipping Method */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold flex items-center mb-4">
              <Truck className="h-5 w-5 mr-2 text-green-600" />
              Shipping Method
            </h2>

            <RadioGroup defaultValue="standard" className="space-y-4">
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex-1 cursor-pointer">
                  <div className="font-medium">Standard Shipping</div>
                  <div className="text-sm text-gray-500">Delivery in 3-5 business days</div>
                </Label>
                <div className="font-medium">$4.99</div>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="flex-1 cursor-pointer">
                  <div className="font-medium">Express Shipping</div>
                  <div className="text-sm text-gray-500">Delivery in 1-2 business days</div>
                </Label>
                <div className="font-medium">$9.99</div>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free" className="flex-1 cursor-pointer">
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm text-gray-500">Delivery in 5-7 business days</div>
                </Label>
                <div className="font-medium">$0.00</div>
              </div>
            </RadioGroup>
          </Card>

          {/* Payment Method */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold flex items-center mb-4">
              <CreditCard className="h-5 w-5 mr-2 text-green-600" />
              Payment Method
            </h2>

            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">Expiry Month</Label>
                      <select id="expiryMonth" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">Expiry Year</Label>
                      <select id="expiryYear" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={new Date().getFullYear() + i}>
                            {new Date().getFullYear() + i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <input type="checkbox" id="saveCard" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-600">
                      Save card for future purchases
                    </label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="paypal">
                <div className="text-center py-8">
                  <div className="mb-4">
                    <Image src="/placeholder.svg" alt="PayPal" width={120} height={40} className="mx-auto" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Continue with PayPal</Button>
                </div>
              </TabsContent>

              <TabsContent value="bank">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-2">Bank Transfer Instructions</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please transfer the total amount to the following bank account:
                    </p>
                    <div className="text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500">Bank Name:</div>
                        <div>EcoBank</div>
                        <div className="text-gray-500">Account Name:</div>
                        <div>Cireco Marketplace Ltd</div>
                        <div className="text-gray-500">Account Number:</div>
                        <div>1234567890</div>
                        <div className="text-gray-500">Routing Number:</div>
                        <div>987654321</div>
                        <div className="text-gray-500">Reference:</div>
                        <div>ORD-12345</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Your order will be processed once we receive your payment. This usually takes 1-2 business days.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutSummary />

          <div className="mt-6">
            <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-base">Place Order</Button>
            <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
