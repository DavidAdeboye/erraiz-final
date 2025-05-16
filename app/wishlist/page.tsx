import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WishlistPage() {
  // This will redirect to login if not authenticated
  requireAuth()

  // Mock wishlist data
  const wishlistItems = [
    {
      id: "product-1",
      name: "Recycled Plastic Container",
      price: 24.99,
      image: "/placeholder.svg",
      seller: "Eco Solutions",
      inStock: true,
    },
    {
      id: "product-2",
      name: "Glass Vase",
      price: 34.99,
      image: "/placeholder.svg",
      seller: "Green Living",
      inStock: true,
    },
    {
      id: "product-3",
      name: "Recycled Paper Notebook",
      price: 12.99,
      image: "/placeholder.svg",
      seller: "Sustainable Home",
      inStock: false,
    },
    {
      id: "product-4",
      name: "Bamboo Utensil Set",
      price: 24.0,
      image: "/placeholder.svg",
      seller: "Eco Solutions",
      inStock: true,
    },
    {
      id: "product-5",
      name: "Eco-friendly Water Bottle",
      price: 19.99,
      image: "/placeholder.svg",
      seller: "Green Living",
      inStock: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <p className="text-gray-500">Items you've saved for later</p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-32 h-32 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.id}`} className="text-lg font-medium hover:text-green-600">
                    {item.name}
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">Seller: {item.seller}</div>
                  <div className="text-xl font-semibold mt-2">${item.price.toFixed(2)}</div>
                  <div className="mt-2">
                    {item.inStock ? (
                      <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                      disabled={!item.inStock}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save items you like to your wishlist and they'll appear here.</p>
          <Link href="/shop" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}
