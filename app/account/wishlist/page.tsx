import Image from "next/image"
import Link from "next/link"
import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

export default function AccountWishlistPage() {
  // This will redirect to login if not authenticated
  requireAuth()

  // Mock wishlist data
  const wishlistItems = [
    {
      id: "product-1",
      name: "Recycled Plastic Container",
      price: 24.99,
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: "product-2",
      name: "Glass Vase",
      price: 34.99,
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: "product-3",
      name: "Recycled Paper Notebook",
      price: 12.99,
      image: "/placeholder.svg",
      inStock: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Your Wishlist</h2>
          <p className="text-sm text-gray-500">Items you've saved for later</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="divide-y">
            {wishlistItems.map((item) => (
              <div key={item.id} className="p-6 flex flex-wrap md:flex-nowrap gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/product/${item.id}`} className="font-medium hover:text-green-600">
                    {item.name}
                  </Link>
                  <div className="text-lg font-semibold mt-1">${item.price.toFixed(2)}</div>
                  <div className="text-sm mt-1">
                    {item.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2" disabled={!item.inStock}>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
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
    </div>
  )
}
