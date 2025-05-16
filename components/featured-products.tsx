import Image from "next/image"
import Link from "next/link"

export default function FeaturedProducts() {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Plastic Made Products"
            width={600}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-semibold mb-2">Plastic Made Products</h3>
            <Link href="/category/plastic-made-products" className="btn-primary inline-block w-max">
              Shop Now
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Shoes"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
              <h3 className="text-white text-sm font-semibold mb-2">Shoes</h3>
              <Link href="/category/footwear" className="text-white text-xs underline">
                View All
              </Link>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Accessories"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
              <h3 className="text-white text-sm font-semibold mb-2">Accessories</h3>
              <Link href="/category/accessories" className="text-white text-xs underline">
                View All
              </Link>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Clothing"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
              <h3 className="text-white text-sm font-semibold mb-2">Clothing</h3>
              <Link href="/category/clothing" className="text-white text-xs underline">
                View All
              </Link>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Home Goods"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
              <h3 className="text-white text-sm font-semibold mb-2">Home Goods</h3>
              <Link href="/category/homeware" className="text-white text-xs underline">
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
