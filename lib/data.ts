import type { Product, Category } from "@/types"

export const products: Product[] = [
  {
    id: "p1",
    name: "Cushion Stool",
    description: "Comfortable stool made from recycled plastic materials.",
    price: 350000,
    image: "/products/stool-1.jpg",
    category: "furniture",
    rating: 4.2,
    reviews: 8657,
    attributes: ["White", "Chair"],
    inStock: true,
  },
  {
    id: "p2",
    name: "Outdoor Chair",
    description: "Durable outdoor chair made from recycled plastic.",
    price: 350000,
    image: "/products/chair-1.jpg",
    category: "furniture",
    rating: 4.2,
    reviews: 18000,
    attributes: ["White", "Chair"],
    inStock: true,
  },
  {
    id: "p3",
    name: "Stone Side Table",
    description: "Elegant side table made from recycled materials.",
    price: 350000,
    image: "/products/table-1.jpg",
    category: "furniture",
    rating: 4.2,
    reviews: 18000,
    attributes: ["White", "Chair"],
    inStock: true,
  },
  {
    id: "p4",
    name: "Blue Kids Chair",
    description: "Colorful chair for children made from recycled plastic.",
    price: 350000,
    image: "/products/chair-2.jpg",
    category: "furniture",
    rating: 4.2,
    reviews: 18000,
    attributes: ["Blue", "Chair"],
    inStock: true,
  },
  {
    id: "p5",
    name: "Recycled Shorts",
    description: "Comfortable shorts made from recycled plastic bottles.",
    price: 350000,
    image: "/products/shorts-1.jpg",
    category: "clothing",
    rating: 4.2,
    reviews: 18000,
    attributes: ["Black", "Clothing"],
    inStock: true,
  },
  {
    id: "p6",
    name: "Eco-Friendly Sneakers",
    description: "Stylish sneakers made from recycled materials.",
    price: 350000,
    image: "/products/shoes-1.jpg",
    category: "footwear",
    rating: 4.2,
    reviews: 18000,
    attributes: ["White", "Shoes"],
    inStock: true,
  },
  {
    id: "p7",
    name: "Decorative Glass Bowl",
    description: "Beautiful bowl made from recycled glass.",
    price: 350000,
    image: "/products/bowl-1.jpg",
    category: "homeware",
    rating: 4.2,
    reviews: 18000,
    attributes: ["Red", "Glass"],
    inStock: true,
  },
  {
    id: "p8",
    name: "Glass Water Bottle",
    description: "Reusable water bottle made from recycled glass.",
    price: 350000,
    image: "/products/bottle-1.jpg",
    category: "homeware",
    rating: 4.2,
    reviews: 18000,
    attributes: ["Green", "Glass"],
    inStock: true,
  },
]

export const categories: Category[] = [
  {
    id: "plastic-made-products",
    name: "Plastic Made Products",
    description: "Discover a range of innovative and sustainable products crafted from recycled plastics.",
    image: "/categories/plastic-made.jpg",
    productCount: 120,
  },
  {
    id: "glass-made-products",
    name: "Glass Made Products",
    description: "Beautiful and functional items crafted from recycled glass materials.",
    image: "/categories/glass-made.jpg",
    productCount: 85,
  },
  {
    id: "fruits-waste-products",
    name: "Fruits Waste Products",
    description: "Innovative products made from fruit waste and byproducts.",
    image: "/categories/fruit-waste.jpg",
    productCount: 64,
  },
  {
    id: "others",
    name: "Others",
    description: "Explore our other sustainable and eco-friendly product categories.",
    image: "/categories/others.jpg",
    productCount: 93,
  },
]

export const getFeaturedProducts = () => {
  return products.slice(0, 4)
}

export const getProductsByCategory = (categoryId: string) => {
  return products.filter((product) => product.category === categoryId)
}

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id)
}

export const getRelatedProducts = (productId: string, limit = 4) => {
  const product = getProductById(productId)
  if (!product) return []

  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
}

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.attributes.some((attr) => attr.toLowerCase().includes(lowercaseQuery)),
  )
}
