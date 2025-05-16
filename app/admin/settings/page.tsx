import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <p className="text-gray-500">Configure platform-wide settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">General Settings</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" defaultValue="Cireco Marketplace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input id="siteUrl" defaultValue="https://cireco.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <textarea
                  id="siteDescription"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
                  defaultValue="Cireco is a marketplace for recycled and sustainable products."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" defaultValue="contact@cireco.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportPhone">Support Phone</Label>
                <Input id="supportPhone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label>Maintenance Mode</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="maintenance-off"
                      name="maintenanceMode"
                      value="off"
                      className="mr-2"
                      checked
                    />
                    <Label htmlFor="maintenance-off" className="cursor-pointer">
                      Off
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="maintenance-on" name="maintenanceMode" value="on" className="mr-2" />
                    <Label htmlFor="maintenance-on" className="cursor-pointer">
                      On
                    </Label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="commissions">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Commission Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultCommission">Default Commission Rate (%)</Label>
                <Input id="defaultCommission" type="number" min="0" max="100" step="0.1" defaultValue="10" />
                <p className="text-xs text-gray-500">
                  This is the default percentage that will be charged on each sale.
                </p>
              </div>

              <div className="space-y-4">
                <Label>Category-Specific Commission Rates</Label>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commission Rate (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Plastic</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Input type="number" min="0" max="100" step="0.1" defaultValue="8" className="w-24" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Glass</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Input type="number" min="0" max="100" step="0.1" defaultValue="12" className="w-24" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Paper</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Input type="number" min="0" max="100" step="0.1" defaultValue="7" className="w-24" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Metal</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Input type="number" min="0" max="100" step="0.1" defaultValue="15" className="w-24" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Bamboo</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Input type="number" min="0" max="100" step="0.1" defaultValue="10" className="w-24" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payoutSchedule">Payout Schedule</Label>
                <select id="payoutSchedule" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly" selected>
                    Monthly
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumPayout">Minimum Payout Amount ($)</Label>
                <Input id="minimumPayout" type="number" min="0" step="0.01" defaultValue="50" />
              </div>

              <div className="pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Shipping Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Default Shipping Methods</Label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="standard-shipping" className="mr-2" checked />
                    <Label htmlFor="standard-shipping" className="cursor-pointer">
                      Standard Shipping
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="express-shipping" className="mr-2" checked />
                    <Label htmlFor="express-shipping" className="cursor-pointer">
                      Express Shipping
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="free-shipping" className="mr-2" checked />
                    <Label htmlFor="free-shipping" className="cursor-pointer">
                      Free Shipping
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="local-pickup" className="mr-2" checked />
                    <Label htmlFor="local-pickup" className="cursor-pointer">
                      Local Pickup
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                <Input id="freeShippingThreshold" type="number" min="0" step="0.01" defaultValue="50" />
                <p className="text-xs text-gray-500">
                  Orders above this amount will qualify for free shipping (if enabled by the seller).
                </p>
              </div>

              <div className="pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Payment Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Enabled Payment Methods</Label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="credit-card" className="mr-2" checked />
                    <Label htmlFor="credit-card" className="cursor-pointer">
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="paypal" className="mr-2" checked />
                    <Label htmlFor="paypal" className="cursor-pointer">
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="bank-transfer" className="mr-2" checked />
                    <Label htmlFor="bank-transfer" className="cursor-pointer">
                      Bank Transfer
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="pay-on-delivery" className="mr-2" />
                    <Label htmlFor="pay-on-delivery" className="cursor-pointer">
                      Pay on Delivery
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <select id="currency" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="USD" selected>
                    USD - US Dollar
                  </option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                <Input id="taxRate" type="number" min="0" max="100" step="0.1" defaultValue="7.5" />
              </div>

              <div className="pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Email Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input id="fromEmail" type="email" defaultValue="noreply@cireco.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input id="fromName" defaultValue="Cireco Marketplace" />
              </div>

              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="order-confirmation" className="mr-2" checked />
                    <Label htmlFor="order-confirmation" className="cursor-pointer">
                      Order Confirmation
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="shipping-updates" className="mr-2" checked />
                    <Label htmlFor="shipping-updates" className="cursor-pointer">
                      Shipping Updates
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="account-creation" className="mr-2" checked />
                    <Label htmlFor="account-creation" className="cursor-pointer">
                      Account Creation
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="password-reset" className="mr-2" checked />
                    <Label htmlFor="password-reset" className="cursor-pointer">
                      Password Reset
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="promotional-emails" className="mr-2" />
                    <Label htmlFor="promotional-emails" className="cursor-pointer">
                      Promotional Emails
                    </Label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
