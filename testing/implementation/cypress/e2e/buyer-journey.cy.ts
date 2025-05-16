describe("Buyer User Journey", () => {
  beforeEach(() => {
    // Set up a clean state before each test
    cy.clearCookies()
    cy.clearLocalStorage()

    // Mock user authentication
    cy.window().then((win) => {
      win.localStorage.setItem(
        "mockAuthState",
        JSON.stringify({
          isAuthenticated: true,
          user: {
            id: "test-user",
            name: "Test User",
            email: "test@example.com",
            roles: ["buyer"],
          },
        }),
      )
    })
  })

  it("should complete a full purchase flow", () => {
    // Visit the homepage
    cy.visit("/")
    cy.contains("h1", "Explore these categories").should("be.visible")

    // Navigate to a product category
    cy.contains("Plastic").click()
    cy.url().should("include", "/category/plastic")

    // Select a product
    cy.get('[data-testid="product-card"]').first().click()
    cy.get('[data-testid="product-title"]').should("be.visible")

    // Add to cart
    cy.contains("button", "Add to cart").click()
    cy.contains("Product added to cart").should("be.visible")

    // Go to cart
    cy.contains("Cart").click()
    cy.url().should("include", "/cart")
    cy.contains("Shopping Cart").should("be.visible")

    // Proceed to checkout
    cy.contains("button", "Proceed to Checkout").click()
    cy.url().should("include", "/checkout")

    // Fill shipping information
    cy.get('[data-testid="address-1"]').click()

    // Select shipping method
    cy.get('[data-testid="shipping-standard"]').click()

    // Select payment method
    cy.get('[role="tab"]').contains("Credit Card").click()
    cy.get("#cardName").type("Test User")
    cy.get("#cardNumber").type("4242424242424242")
    cy.get("#expiryMonth").select("12")
    cy.get("#expiryYear").select("2030")
    cy.get("#cvv").type("123")

    // Place order
    cy.contains("button", "Place Order").click()

    // Verify order confirmation
    cy.url().should("include", "/checkout/confirmation")
    cy.contains("Order Confirmed!").should("be.visible")
    cy.contains("Thank you for your purchase").should("be.visible")

    // Check order in account
    cy.contains("View All Orders").click()
    cy.url().should("include", "/account/orders")
    cy.contains("Order History").should("be.visible")
  })

  it("should add and remove items from wishlist", () => {
    // Visit the shop page
    cy.visit("/shop")

    // Add first product to wishlist
    cy.get('[data-testid="wishlist-button"]').first().click()
    cy.contains("Added to wishlist").should("be.visible")

    // Go to wishlist
    cy.visit("/wishlist")
    cy.contains("My Wishlist").should("be.visible")

    // Verify product is in wishlist
    cy.get('[data-testid="wishlist-item"]').should("have.length.at.least", 1)

    // Remove from wishlist
    cy.contains("button", "Remove").click()
    cy.contains("Removed from wishlist").should("be.visible")

    // Verify wishlist is empty
    cy.contains("Your wishlist is empty").should("be.visible")
  })

  it("should filter and search for products", () => {
    // Visit the shop page
    cy.visit("/shop")

    // Use category filter
    cy.get('[data-testid="category-filter"]').select("Glass")
    cy.url().should("include", "category=glass")

    // Use price filter
    cy.get("#price-2").check()
    cy.url().should("include", "price=25-50")

    // Use search
    cy.get('[data-testid="search-input"]').type("vase{enter}")
    cy.url().should("include", "search=vase")

    // Verify filtered results
    cy.get('[data-testid="product-card"]').should("exist")
    cy.contains("No products found").should("not.exist")
  })
})
