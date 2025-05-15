import Image from "next/image"
import Link from "next/link"

interface CategoryBannerProps {
  title: string
  description: string
  imageUrl: string
  link: string
}

export default function CategoryBanner({ title, description, imageUrl, link }: CategoryBannerProps) {
  return (
    <div className="relative rounded-lg overflow-hidden mb-12">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          <Link href={link} className="btn-primary inline-block w-max">
            View Items
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover col-span-2"
          />
        </div>
      </div>
    </div>
  )
}
