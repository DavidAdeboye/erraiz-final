describe("Basic Navigation", () => {
  it("should navigate to the home page", () => {
    cy.visit("/")
    cy.contains("Explore these categories").should("be.visible")
  })

  it("should navigate to the shop page", () => {
    cy.visit("/shop")
    cy.contains("All Products").should("be.visible")
  })

  it("should navigate to a category page", () => {
    cy.visit("/category/plastic")
    cy.contains("Plastic").should("be.visible")
  })

  it("should navigate to a product page", () => {
    cy.visit("/product/plastic-recycled-item-1")
    cy.contains("Add to Cart").should("be.visible")
  })

  it("should handle 404 pages gracefully", () => {
    cy.visit("/non-existent-page", { failOnStatusCode: false })
    cy.contains("Page Not Found").should("be.visible")
  })
})
