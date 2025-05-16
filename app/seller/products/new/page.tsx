import { requireRole } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  // This will redirect if not authenticated as a seller
  requireRole("seller")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p className="text-gray-500">Create a new product listing</p>
        </div>
        <div>
          <Link href="/seller/products" className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50 transition">
            Cancel
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Product Information</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" name="name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="Describe your product in detail..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="plastic">Plastic</option>
                    <option value="glass">Glass</option>
                    <option value="paper">Paper</option>
                    <option value="metal">Metal</option>
                    <option value="bamboo">Bamboo</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Select a subcategory</option>
                    <option value="containers">Containers</option>
                    <option value="utensils">Utensils</option>
                    <option value="decorative">Decorative</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop images here, or click to browse</p>
                  <p className="text-xs text-gray-400">
                    Upload up to 5 images. First image will be the cover (max 2MB each).
                  </p>
                  <input type="file" multiple className="hidden" />
                  <Button type="button" variant="outline" size="sm" className="mt-4">
                    Upload Images
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-8">
            <h2 className="text-lg font-semibold mb-6">Pricing & Inventory</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input id="price" name="price" type="number" step="0.01" min="0" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comparePrice">Compare-at Price ($)</Label>
                  <Input id="comparePrice" name="comparePrice" type="number" step="0.01" min="0" />
                  <p className="text-xs text-gray-500">Original price before discount</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per item ($)</Label>
                  <Input id="cost" name="cost" type="number" step="0.01" min="0" />
                  <p className="text-xs text-gray-500">Helps calculate profit</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                  <Input id="sku" name="sku" placeholder="e.g. PLST-001" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                  <Input id="barcode" name="barcode" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input id="quantity" name="quantity" type="number" min="0" required />
                </div>

                <div className="space-y-2">
                  <Label>Track Inventory</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input type="radio" id="track-yes" name="trackInventory" value="yes" className="mr-2" />
                      <Label htmlFor="track-yes" className="cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="track-no" name="trackInventory" value="no" className="mr-2" />
                      <Label htmlFor="track-no" className="cursor-pointer">
                        No
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-8">
            <h2 className="text-lg font-semibold mb-6">Shipping</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" name="weight" type="number" step="0.01" min="0" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Dimensions (cm)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input id="length" name="length" placeholder="Length" />
                    <Input id="width" name="width" placeholder="Width" />
                    <Input id="height" name="height" placeholder="Height" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Shipping Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="free-shipping" name="freeShipping" className="mr-2" />
                    <Label htmlFor="free-shipping" className="cursor-pointer">
                      Free Shipping
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="local-pickup" name="localPickup" className="mr-2" />
                    <Label htmlFor="local-pickup" className="cursor-pointer">
                      Local Pickup Available
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-6">Product Status</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Visibility</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="draft">Draft</option>
                  <option value="active">Active (Visible)</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="Enter tags separated by commas" />
                <p className="text-xs text-gray-500">e.g. eco-friendly, recycled, sustainable</p>
              </div>

              <div className="pt-4 border-t mt-4">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Save Product
                </Button>
                <Button type="button" variant="outline" className="w-full mt-2">
                  Save as Draft
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
