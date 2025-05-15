import Image from "next/image"
import Link from "next/link"

export default function EmptyCart() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <Image src="/empty-cart.svg" alt="Empty cart" width={200} height={200} className="mx-auto mb-6" />

        <h2 className="text-2xl font-bold mb-2">Oops! Your cart is empty.</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet. Continue shopping to find great sustainable products.
        </p>

        <Link href="/" className="btn-primary">
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
