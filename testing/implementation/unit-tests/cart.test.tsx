import { render, screen, fireEvent, waitFor } from "@/testing/implementation/test-utils"
import CartPage from "@/app/cart/page"
import { useCart } from "@/hooks/use-cart"

// Mock the cart hook
jest.mock("@/hooks/use-cart", () => ({
  useCart: jest.fn(),
}))

describe("Cart Page", () => {
  const mockCartItems = [
    {
      id: "product-1",
      name: "Recycled Plastic Container",
      price: 24.99,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: "product-2",
      name: "Glass Vase",
      price: 34.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ]

  const mockEmptyCart = []

  const mockCartFunctions = {
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    getSubtotal: jest.fn().mockReturnValue(84.97),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders cart with items", () => {
    // Setup the mock implementation for this test
    ;(useCart as jest.Mock).mockReturnValue({
      items: mockCartItems,
      ...mockCartFunctions,
    })

    render(<CartPage />)

    // Check if cart items are rendered
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument()
    expect(screen.getByText("Recycled Plastic Container")).toBeInTheDocument()
    expect(screen.getByText("Glass Vase")).toBeInTheDocument()

    // Check if totals are correct
    expect(screen.getByText("$84.97")).toBeInTheDocument() // Subtotal
    expect(screen.getByText("$4.99")).toBeInTheDocument() // Shipping
    expect(screen.getByText("$89.96")).toBeInTheDocument() // Total
  })

  test("renders empty cart state", () => {
    // Setup the mock implementation for this test
    ;(useCart as jest.Mock).mockReturnValue({
      items: mockEmptyCart,
      ...mockCartFunctions,
    })

    render(<CartPage />)

    // Check if empty cart message is displayed
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument()
    expect(screen.getByText("Looks like you haven't added any products to your cart yet.")).toBeInTheDocument()
    expect(screen.getByText("Start Shopping")).toBeInTheDocument()
  })

  test("updates quantity when + button is clicked", async () => {
    // Setup the mock implementation for this test
    ;(useCart as jest.Mock).mockReturnValue({
      items: mockCartItems,
      ...mockCartFunctions,
    })

    render(<CartPage />)

    // Find the + button for the first product and click it
    const plusButtons = screen.getAllByRole("button", { name: /\+/i })
    fireEvent.click(plusButtons[0])

    // Check if updateQuantity was called with correct arguments
    await waitFor(() => {
      expect(mockCartFunctions.updateQuantity).toHaveBeenCalledWith("product-1", 3)
    })
  })

  test("updates quantity when - button is clicked", async () => {
    // Setup the mock implementation for this test
    ;(useCart as jest.Mock).mockReturnValue({
      items: mockCartItems,
      ...mockCartFunctions,
    })

    render(<CartPage />)

    // Find the - button for the first product and click it
    const minusButtons = screen.getAllByRole("button", { name: /-/i })
    fireEvent.click(minusButtons[0])

    // Check if updateQuantity was called with correct arguments
    await waitFor(() => {
      expect(mockCartFunctions.updateQuantity).toHaveBeenCalledWith("product-1", 1)
    })
  })

  test("removes item when remove button is clicked", async () => {
    // Setup the mock implementation for this test
    ;(useCart as jest.Mock).mockReturnValue({
      items: mockCartItems,
      ...mockCartFunctions,
    })

    render(<CartPage />)

    // Find the remove button for the first product and click it
    const removeButtons = screen.getAllByText("Remove")
    fireEvent.click(removeButtons[0])

    // Check if removeItem was called with correct arguments
    await waitFor(() => {
      expect(mockCartFunctions.removeItem).toHaveBeenCalledWith("product-1")
    })
  })

  test("applies valid promo code", async () => {
    // Mock the promo code function
    const mockApplyPromo = jest.fn()

    // Setup the mock implementation for this test
    ;(useCart as jest.Mock).mockReturnValue({
      items: mockCartItems,
      ...mockCartFunctions,
      applyPromoCode: mockApplyPromo,
    })

    render(<CartPage />)

    // Enter promo code
    const promoInput = screen.getByPlaceholderText("Enter code")
    fireEvent.change(promoInput, { target: { value: "SAVE10" } })

    // Click apply button
    const applyButton = screen.getByText("Apply")
    fireEvent.click(applyButton)

    // Check if applyPromoCode was called with correct arguments
    await waitFor(() => {
      expect(mockApplyPromo).toHaveBeenCalledWith("SAVE10")
    })
  })
})
