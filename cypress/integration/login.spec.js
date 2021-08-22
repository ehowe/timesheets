describe('Login', () => {
  beforeEach(() => {
    cy.visit('/users/sign_in')
  })

  it('logs in', () => {
    cy.get("[name=email]").type("test@test.com")
    cy.get("[name=password]").type("asdf")
    cy.get('button').contains('Login').click()
    cy.get('.alert-success').should('be.visible')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('fails to login with an incorrect password', () => {
    cy.get("[name=email]").type("test@test.com")
    cy.get("[name=password]").type("bad")
    cy.get('button').contains('Login').click()
    cy.get('.alert-danger').should('be.visible')
  })
})
