import Link from "next/link"

interface CategoryMenuProps {
  categorySlug: string
}

export default function CategoryMenu({ categorySlug }: CategoryMenuProps) {
  // Different subcategories based on the main category
  const subcategories = {
    "plastic-made-products": [
      { name: "Chairs", count: 120, href: "/category/plastic-made-products/chairs" },
      { name: "Tables", count: 85, href: "/category/plastic-made-products/tables" },
      { name: "Storage", count: 64, href: "/category/plastic-made-products/storage" },
      { name: "Decorative Items", count: 93, href: "/category/plastic-made-products/decorative" },
      { name: "Kitchen Utensils", count: 78, href: "/category/plastic-made-products/kitchen" },
      { name: "Outdoor Furniture", count: 42, href: "/category/plastic-made-products/outdoor" },
    ],
    "glass-made-products": [
      { name: "Vases", count: 56, href: "/category/glass-made-products/vases" },
      { name: "Drinkware", count: 112, href: "/category/glass-made-products/drinkware" },
      { name: "Decorative Items", count: 87, href: "/category/glass-made-products/decorative" },
      { name: "Lighting", count: 45, href: "/category/glass-made-products/lighting" },
    ],
    "fruits-waste-products": [
      { name: "Tableware", count: 38, href: "/category/fruits-waste-products/tableware" },
      { name: "Packaging", count: 64, href: "/category/fruits-waste-products/packaging" },
      { name: "Decorative Items", count: 52, href: "/category/fruits-waste-products/decorative" },
    ],
  }

  // Get the appropriate subcategories
  const items = subcategories[categorySlug as keyof typeof subcategories] || []

  return (
    <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 w-64 z-50">
      <div className="p-4">
        <h3 className="font-medium text-sm mb-3">Subcategories</h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.name} className="flex justify-between items-center">
              <Link href={item.href} className="text-sm text-gray-700 hover:text-green-600">
                {item.name}
              </Link>
              <span className="text-xs text-gray-500">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
