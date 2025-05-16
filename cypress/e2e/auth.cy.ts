describe("Authentication", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it("should allow a user to register", () => {
    cy.visit("/register")
    cy.get('input[name="name"]').type("Test User")
    cy.get('input[name="email"]').type("test-user@example.com")
    cy.get('input[name="password"]').type("password123")
    cy.get('input[name="confirmPassword"]').type("password123")
    cy.get('button[type="submit"]').click()

    // This will fail in the real app since we're not actually creating a user
    // but it shows the test structure
    cy.url().should("include", "/account")
  })

  it("should allow a user to login", () => {
    cy.visit("/login")
    cy.get('input[name="email"]').type("demo@example.com")
    cy.get('input[name="password"]').type("password123")
    cy.get('button[type="submit"]').click()

    // This will fail in the real app since we're not actually logging in
    // but it shows the test structure
    cy.url().should("include", "/account")
  })
})
