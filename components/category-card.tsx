import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  name: string
  imageUrl: string
  link: string
  productCount?: number
  isMobile?: boolean
}

export default function CategoryCard({ name, imageUrl, link, productCount, isMobile = false }: CategoryCardProps) {
  return (
    <Link href={link} className="block group">
      <div className="relative rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-3">
          <h3 className={`text-white font-medium ${isMobile ? "text-sm" : "text-base"}`}>{name}</h3>
          {productCount !== undefined && (
            <p className={`text-white ${isMobile ? "text-xs" : "text-sm"}`}>{productCount} products</p>
          )}
        </div>
      </div>
    </Link>
  )
}
