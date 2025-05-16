import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="grid md:grid-cols-2 gap-4 rounded-xl overflow-hidden">
      <div className="aspect-video md:aspect-auto relative bg-gray-200">
        <Image src="/placeholder.svg" alt="Hero image" fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-center p-6 md:p-10 bg-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Lorem ipsum dolor sit amet</h1>
        <p className="text-gray-600 mb-6">
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link href="/shop" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition w-fit">
          Shop Now
        </Link>
      </div>
    </div>
  )
}
