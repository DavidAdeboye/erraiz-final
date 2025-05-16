describe("Admin User Journey", () => {
  beforeEach(() => {
    // Set up a clean state before each test
    cy.clearCookies()
    cy.clearLocalStorage()

    // Mock admin authentication
    cy.window().then((win) => {
      win.localStorage.setItem(
        "mockAuthState",
        JSON.stringify({
          isAuthenticated: true,
          user: {
            id: "test-admin",
            name: "Test Admin",
            email: "admin@example.com",
            roles: ["admin"],
          },
        }),
      )
    })
  })

  it("should manage users as an admin", () => {
    // Visit admin dashboard
    cy.visit("/admin/dashboard")
    cy.contains("Dashboard").should("be.visible")

    // Navigate to users page
    cy.contains("Users").click()
    cy.url().should("include", "/admin/users")

    // Search for a user
    cy.get('[data-testid="search-input"]').type("john{enter}")
    cy.contains("tr", "john@example.com").should("be.visible")

    // View user details
    cy.contains("tr", "john@example.com").find("a").contains("View").click()
    cy.contains("User Details").should("be.visible")

    // Edit user
    cy.contains("Edit User").click()

    // Update user role
    cy.get('[data-testid="role-selector"]').select("seller")

    // Save changes
    cy.contains("button", "Save Changes").click()

    // Verify changes were saved
    cy.contains("User updated successfully").should("be.visible")
    cy.contains("seller").should("be.visible")
  })

  it("should manage products as an admin", () => {
    // Visit admin products page
    cy.visit("/admin/products")
    cy.contains("Products").should("be.visible")

    // Filter products
    cy.get('[data-testid="category-filter"]').select("Glass")
    cy.get('[data-testid="status-filter"]').select("Active")

    // Approve a product
    cy.contains("tr", "Pending Review").find('[data-testid="approve-button"]').click()
    cy.contains("Confirm Approval").click()

    // Verify product was approved
    cy.contains("Product approved successfully").should("be.visible")
    cy.contains("Active").should("be.visible")

    // Feature a product
    cy.contains("tr", "Glass Vase").find('[data-testid="feature-button"]').click()

    // Verify product was featured
    cy.contains("Product featured successfully").should("be.visible")
    cy.contains("Featured").should("be.visible")
  })

  it("should manage categories as an admin", () => {
    // Visit admin categories page
    cy.visit("/admin/categories")
    cy.contains("Categories").should("be.visible")

    // Add a new category
    cy.contains("Add Category").click()
    cy.get("#categoryName").type("Recycled Metal")
    cy.get("#categoryDescription").type("Products made from recycled metal materials")

    // Upload category image (mock)
    cy.get('[data-testid="image-upload"]').attachFile("test-image.jpg", { subjectType: "input" })

    // Save category
    cy.contains("button", "Save Category").click()

    // Verify category was added
    cy.contains("Category created successfully").should("be.visible")
    cy.contains("Recycled Metal").should("be.visible")

    // Edit category
    cy.contains("tr", "Recycled Metal").find('[data-testid="edit-button"]').click()

    // Update category details
    cy.get("#categoryName").clear().type("Upcycled Metal")

    // Save changes
    cy.contains("button", "Save Changes").click()

    // Verify changes were saved
    cy.contains("Category updated successfully").should("be.visible")
    cy.contains("Upcycled Metal").should("be.visible")
  })

  it("should manage commissions as an admin", () => {
    // Visit admin commissions page
    cy.visit("/admin/commissions")
    cy.contains("Commission Management").should("be.visible")

    // Update global commission rate
    cy.get("#globalCommissionRate").clear().type("12")
    cy.contains("button", "Update Global Rate").click()

    // Verify rate was updated
    cy.contains("Commission rate updated successfully").should("be.visible")

    // Set category-specific commission
    cy.contains("Category Specific Rates").click()
    cy.get('[data-testid="category-selector"]').select("Glass")
    cy.get("#categoryCommissionRate").clear().type("15")
    cy.contains("button", "Set Category Rate").click()

    // Verify category rate was set
    cy.contains("Category commission rate updated").should("be.visible")
    cy.contains("tr", "Glass").contains("15%").should("be.visible")
  })
})
