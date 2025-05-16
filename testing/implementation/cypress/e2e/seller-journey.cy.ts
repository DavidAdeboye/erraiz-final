describe("Seller User Journey", () => {
  beforeEach(() => {
    // Set up a clean state before each test
    cy.clearCookies()
    cy.clearLocalStorage()

    // Mock seller authentication
    cy.window().then((win) => {
      win.localStorage.setItem(
        "mockAuthState",
        JSON.stringify({
          isAuthenticated: true,
          user: {
            id: "test-seller",
            name: "Test Seller",
            email: "seller@example.com",
            roles: ["seller"],
          },
        }),
      )
    })
  })

  it("should manage products as a seller", () => {
    // Visit seller dashboard
    cy.visit("/seller/dashboard")
    cy.contains("Seller Dashboard").should("be.visible")

    // Navigate to products page
    cy.contains("Products").click()
    cy.url().should("include", "/seller/products")

    // Add a new product
    cy.contains("Add New Product").click()
    cy.url().should("include", "/seller/products/new")

    // Fill product details
    cy.get("#productName").type("Test Recycled Glass Vase")
    cy.get("#productDescription").type("A beautiful vase made from recycled glass")
    cy.get("#price").type("29.99")
    cy.get("#stock").type("50")
    cy.get("#category").select("Glass")

    // Add product tags
    cy.get("#tags").type("vase,recycled,home decor{enter}")

    // Upload product image (mock)
    cy.get('[data-testid="image-upload"]').attachFile("test-image.jpg", { subjectType: "input" })

    // Save product
    cy.contains("button", "Save Product").click()

    // Verify product was added
    cy.contains("Product saved successfully").should("be.visible")
    cy.url().should("include", "/seller/products")
    cy.contains("Test Recycled Glass Vase").should("be.visible")

    // Edit product
    cy.contains("tr", "Test Recycled Glass Vase").find('[data-testid="edit-button"]').click()
    cy.url().should("include", "/seller/products/")
    cy.url().should("include", "/edit")

    // Update product details
    cy.get("#price").clear().type("34.99")

    // Save changes
    cy.contains("button", "Save Changes").click()

    // Verify changes were saved
    cy.contains("Product updated successfully").should("be.visible")
    cy.contains("34.99").should("be.visible")
  })

  it("should manage orders as a seller", () => {
    // Visit seller orders page
    cy.visit("/seller/orders")
    cy.contains("Orders").should("be.visible")

    // View order details
    cy.get("table tbody tr").first().find("a").contains("View").click()
    cy.contains("Order Details").should("be.visible")

    // Update order status
    cy.get('[data-testid="order-status"]').select("Processing")
    cy.contains("button", "Update Status").click()

    // Verify status update
    cy.contains("Order status updated").should("be.visible")
    cy.contains("Processing").should("be.visible")

    // Add tracking information
    cy.get("#trackingNumber").type("TRK123456789")
    cy.get("#carrier").select("FedEx")
    cy.contains("button", "Add Tracking").click()

    // Verify tracking added
    cy.contains("Tracking information added").should("be.visible")
    cy.contains("TRK123456789").should("be.visible")
  })

  it("should view analytics as a seller", () => {
    // Visit seller analytics page
    cy.visit("/seller/analytics")
    cy.contains("Analytics Dashboard").should("be.visible")

    // Check different time periods
    cy.get('[data-testid="date-range-picker"]').click()
    cy.contains("Last 30 days").click()

    // Verify charts are displayed
    cy.get('[data-testid="sales-chart"]').should("be.visible")
    cy.get('[data-testid="orders-chart"]').should("be.visible")

    // Switch to different analytics tabs
    cy.contains("Products").click()
    cy.get('[data-testid="product-performance-table"]').should("be.visible")

    cy.contains("Customers").click()
    cy.get('[data-testid="customer-insights-chart"]').should("be.visible")
  })
})
